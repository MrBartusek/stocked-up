import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import mongoose from 'mongoose';
import { ProductDocument } from './schemas/product';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	findOne(id: mongoose.Types.ObjectId | string): Promise<ProductDocument> {
		return this.productsRepository.findById(id);
	}

	findAll(organizationId: mongoose.Types.ObjectId | string): Promise<ProductDocument[]> {
		return this.productsRepository.find({ organization: organizationId });
	}
}
