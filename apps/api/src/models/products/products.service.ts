import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}

	create(createProductDto: CreateProductDto) {
		return this.productsRepository.create(createProductDto);
	}

	findAll() {
		return this.productsRepository.find();
	}

	findById(id: string) {
		return this.productsRepository.findById(id);
	}

	update(id: string, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: string) {
		return `This action removes a #${id} product`;
	}
}
