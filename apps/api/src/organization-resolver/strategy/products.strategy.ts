import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductsService } from '../../models/products/products.service';
import { ResolverStrategy } from '../types/resolver-strategy.type';

@Injectable()
export class ProductsStrategy implements ResolverStrategy {
	constructor(private readonly productsService: ProductsService) {}

	async resolve(id: Types.ObjectId): Promise<Types.ObjectId> {
		const product = await this.productsService.findOne(id);
		if (!product) return null;
		return product.organization;
	}
}
