import { Injectable } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'shared-types';
import { ImagesService } from '../../images/images.service';
import { InventoryService } from '../inventory/inventory.service';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
	constructor(
		private readonly productsRepository: ProductsRepository,
		private readonly imagesService: ImagesService,
		private readonly inventoryService: InventoryService,
	) {}

	create(dto: CreateProductDto): Promise<ProductDocument> {
		return this.productsRepository.create({
			organization: dto.organizationId as any,
			...dto,
		});
	}

	async update(
		id: mongoose.Types.ObjectId,
		dto: UpdateProductDto,
	): Promise<ProductDocument | null> {
		const { image, ...rest } = dto;
		const product = await this.productsRepository.findOneByIdAndUpdate(id, rest);
		if (!product) return null;
		product.imageKey = await this.imagesService.handleImageDtoAndGetKey(product, image);
		return await this.productsRepository.findOneByIdAndUpdate(id, product);
	}

	async delete(id: mongoose.Types.ObjectId): Promise<ProductDocument | null> {
		const product = await this.productsRepository.deleteOneById(id);
		if (!product) return null;
		await this.inventoryService.deleteManyByProduct(id);
		await this.imagesService.deleteImage(product);
		return product;
	}

	exist(id: Types.ObjectId) {
		return this.productsRepository.exist({ _id: id });
	}

	findOne(id: mongoose.Types.ObjectId): Promise<ProductDocument> {
		return this.productsRepository.findById(id);
	}

	findAll(organizationId: mongoose.Types.ObjectId): Promise<ProductDocument[]> {
		return this.productsRepository.find({ organization: organizationId });
	}

	countAll(organizationId: mongoose.Types.ObjectId): Promise<number> {
		return this.productsRepository.countDocuments({ organization: organizationId });
	}
}
