import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import SharedTypes from 'shared-types';

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto): Promise<SharedTypes.Product> {
		return this.productsService.create(createProductDto);
	}

	@Get()
	findAll(): Promise<SharedTypes.Product[]> {
		return this.productsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<SharedTypes.Product> {
		return this.productsService.findById(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsService.remove(id);
	}
}
