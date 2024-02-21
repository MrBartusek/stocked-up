import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import mongoose, { Types } from 'mongoose';
import { RepositoryPaginateResult } from '../../database/entity.repository';
import { PageQueryDto } from '../../dto/page-query.dto';
import { ImagesService } from '../../images/images.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';
import { ProductDeletedEvent } from './events/product-deleted.event';

@Injectable()
export class ProductsService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly productsRepository: ProductsRepository,
		private readonly imagesService: ImagesService,
	) {}

	create(dto: CreateProductDto): Promise<ProductDocument> {
		return this.productsRepository.create({
			...dto,
			organization: new Types.ObjectId(dto.organization) as any,
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

		await this.imagesService.deleteImage(product);

		const event = new ProductDeletedEvent(product);
		this.eventEmitter.emit('product.deleted', event);

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

	async getOrganizationFromProduct(id: mongoose.Types.ObjectId): Promise<Types.ObjectId | null> {
		const result = await this.productsRepository.findById(id, { organization: 1 });
		return result ? (result.organization as any) : null;
	}
}
