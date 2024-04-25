import {
	Body,
	Controller,
	Delete,
	Get,
	Injectable,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PageDto, ProductDto } from 'shared-types';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasProductAccessPipe } from '../../security/pipes/has-product-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthGuard)
@Injectable()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@ApiOperation({ summary: 'Create new product definition' })
	async create(@Body(SecurityValidationPipe) dto: CreateProductDto): Promise<ProductDto> {
		const product = await this.productsService.create(dto);

		return Product.toDto(product);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a product by id' })
	async findOne(
		@Param('id', ParseObjectIdPipe, HasProductAccessPipe) id: Types.ObjectId,
	): Promise<ProductDto> {
		const product = await this.productsService.findOne(id);
		return Product.toDto(product);
	}

	@Get('list/:id')
	@ApiOperation({ summary: 'List all products in organization' })
	async list(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) orgId: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<ProductDto>({
				allowedFilters: ['name', 'buyPrice', 'sellPrice', 'unit'],
			}),
		)
		pageQuery: PageQueryDto<ProductDto>,
	): Promise<PageDto<ProductDto>> {
		const { items, meta } = await this.productsService.paginate(orgId, pageQuery);

		const productDTOs = items.map((product) => Product.toBasicDto(product));
		return {
			meta,
			items: productDTOs,
		};
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a product by id' })
	async update(
		@Param('id', ParseObjectIdPipe, HasProductAccessPipe) id: Types.ObjectId,
		@Body(SecurityValidationPipe) dto: UpdateProductDto,
	): Promise<ProductDto> {
		const product = await this.productsService.update(id, dto);
		return Product.toDto(product);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete product by id' })
	async delete(
		@Param('id', ParseObjectIdPipe, HasProductAccessPipe) id: Types.ObjectId,
	): Promise<ProductDto> {
		const product = await this.productsService.delete(id);
		return Product.toDto(product);
	}
}
