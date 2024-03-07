import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import mongoose, { Types } from 'mongoose';
import { RepositoryPaginateResult } from '../../database/entity.repository';
import { PageQueryDto } from '../../dto/page-query.dto';
import { ImagesService } from '../../images/images.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCreatedEvent } from './events/product-created.event';
import { ProductDeletedEvent } from './events/product-deleted.event';
import { ProductUpdatedEvent } from './events/product-updated.event';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly productsRepository: ProductsRepository,
		private readonly imagesService: ImagesService,
	) {}

	async create(dto: CreateProductDto): Promise<ProductDocument> {
		const { organization, ...rest } = dto;
		const product = await this.productsRepository.create({
			organization: new Types.ObjectId(organization),
			...rest,
		});

		const event = new ProductCreatedEvent(product);
		this.eventEmitter.emit('product.created', event);

		return product;
	}

	async update(
		id: mongoose.Types.ObjectId,
		dto: UpdateProductDto,
	): Promise<ProductDocument | null> {
		const { image, organization, ...rest } = dto;
		const product = await this.productsRepository.findOneByIdAndUpdate(id, {
			organization: new Types.ObjectId(organization),
			...rest,
		});
		if (!product) return null;

		product.imageKey = await this.imagesService.handleImageDtoAndGetKey(product, image);

		const event = new ProductUpdatedEvent(product);
		this.eventEmitter.emit('product.updated', event);

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

	async deleteManyByOrg(organizationId: mongoose.Types.ObjectId): Promise<number> {
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
