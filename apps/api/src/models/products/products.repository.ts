import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product';

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
	constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
		super(productModel);
	}
}
