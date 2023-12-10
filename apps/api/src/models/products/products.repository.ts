import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
	/* istanbul ignore next */
	constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
		super(productModel);
	}
}
