import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './schemas/product';
import { BasicProductDto, ProductDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthenticatedGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ProductDto> {
		const product = await this.productsService.findOne(id);
		if (!product) {
			throw new NotFoundException();
		}
		return Product.toDto(product);
	}

	@Get('by-org/:id')
	async findAll(@Param('id') id: string): Promise<BasicProductDto[]> {
		const products = await this.productsService.findAll(id);
		return products.map((product) => Product.toBasicDto(product));
	}
}
