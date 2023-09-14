import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
	constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

	create(createProductDto: CreateProductDto) {
		const newProduct = new this.productModel(createProductDto);
		return newProduct.save();
	}

	findAll() {
		return this.productModel.find().exec();
	}

	findOne(id: string) {
		return `This action returns a #${id} product`;
	}

	update(id: string, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: string) {
		return `This action removes a #${id} product`;
	}
}
