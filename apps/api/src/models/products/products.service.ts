import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import mongoose from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from 'shared-types';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	create(dto: CreateProductDto): Promise<ProductDocument> {
		return this.productsRepository.create({
			organization: dto.organizationId as any,
			...dto,
		});
	}

	findOne(id: mongoose.Types.ObjectId | string): Promise<ProductDocument> {
		return this.productsRepository.findById(id);
	}

	findAll(organizationId: mongoose.Types.ObjectId | string): Promise<ProductDocument[]> {
		return this.productsRepository.find({ organization: organizationId });
	}

	countAll(organizationId: mongoose.Types.ObjectId | string): Promise<number> {
		return this.productsRepository.countDocuments({ organization: organizationId });
	}
}
