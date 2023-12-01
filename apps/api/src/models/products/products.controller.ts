import {
	Body,
	Controller,
	Get,
	Injectable,
	NotFoundException,
	Param,
	Post,
	UseGuards,
	ValidationPipe,
	Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { BasicProductDto, CreateProductDto, ProductDto, UpdateProductDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthenticatedGuard)
@Injectable()
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly organizationStatsService: OrganizationsStatsService,
	) {}

	@Post()
	async create(@Body(new ValidationPipe()) dto: CreateProductDto): Promise<ProductDto> {
		const product = await this.productsService.create(dto);
		await this.updateTotalProductsCount(dto.organizationId as any);
		return Product.toDto(product);
	}

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<ProductDto> {
		const product = await this.productsService.findOne(id);
		if (!product) {
			throw new NotFoundException();
		}
		return Product.toDto(product);
	}

	@Get('by-org/:id')
	async findAll(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<BasicProductDto[]> {
		const products = await this.productsService.findAll(id);
		return products.map((product) => Product.toBasicDto(product));
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(new ValidationPipe()) dto: UpdateProductDto,
	): Promise<ProductDto> {
		const product = await this.productsService.update(id, dto);
		if (!product) {
			throw new NotFoundException();
		}
		return Product.toDto(product);
	}

	async updateTotalProductsCount(organizationId: Types.ObjectId) {
		const newCount = await this.productsService.countAll(organizationId);
		await this.organizationStatsService.updateProductsCount(organizationId, newCount);
	}
}
