import { Injectable } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { CreateProductDto, PageQueryDto, UpdateProductDto } from 'shared-types';
import { RepositoryPaginateResult } from '../../database/entity.repository';
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

	async deleteAllByOrg(organizationId: mongoose.Types.ObjectId): Promise<number> {
		const products = await this.productsRepository.find({ organization: organizationId });
		for await (const product of products) {
			await this.delete(product._id);
		}
		return products.length;
	}

	exist(id: Types.ObjectId) {
		return this.productsRepository.exist({ _id: id });
	}

	findOne(id: mongoose.Types.ObjectId): Promise<ProductDocument> {
		return this.productsRepository.findById(id);
	}

	paginate(
		organizationId: mongoose.Types.ObjectId,
		pageQueryDto: PageQueryDto,
	): Promise<RepositoryPaginateResult<ProductDocument>> {
		return this.productsRepository.paginate({ organization: organizationId }, pageQueryDto);
	}

	countAll(organizationId: mongoose.Types.ObjectId): Promise<number> {
		return this.productsRepository.countDocuments({ organization: organizationId });
	}
}
