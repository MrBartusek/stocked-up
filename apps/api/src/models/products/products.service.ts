import { Injectable } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { CreateProductDto } from 'shared-types';
import { ProductsRepository } from './products.repository';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	create(dto: CreateProductDto): Promise<ProductDocument> {
		return this.productsRepository.create({
			organization: dto.organizationId as any,
			...dto,
		});
	}

	exist(id: Types.ObjectId) {
		return this.productsRepository.exist({ _id: id });
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
