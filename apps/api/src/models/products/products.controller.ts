import {
	Body,
	Controller,
	Get,
	Injectable,
	NotFoundException,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { BasicProductDto, CreateProductDto, ProductDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import mongoose from 'mongoose';
import { OrganizationsService } from '../organizations/organizations.service';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthenticatedGuard)
@Injectable()
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly organizationService: OrganizationsService,
	) {}

	@Post()
	async create(@Body() dto: CreateProductDto): Promise<ProductDto> {
		const product = await this.productsService.create(dto);
		const newCount = await this.productsService.countAll(dto.organizationId);
		await this.organizationService.updateProductsCount(dto.organizationId, newCount);
		return Product.toDto(product);
	}

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
		const objectId = new mongoose.Types.ObjectId(id);
		const products = await this.productsService.findAll(objectId);
		return products.map((product) => Product.toBasicDto(product));
	}
}
