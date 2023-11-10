import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product';
import { EntityRepository } from '../../database/entity.repository';

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
	constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
		super(productModel);
	}
}
