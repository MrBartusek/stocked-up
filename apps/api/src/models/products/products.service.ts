import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
	constructor(private readonly productsRepository: ProductsRepository) {}
}
