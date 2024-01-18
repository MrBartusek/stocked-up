import {
	Body,
	Controller,
	Delete,
	Get,
	Injectable,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PageDto, ProductDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import CreateProductDto from './dto/create-product-dto';
import UpdateProductDto from './dto/update-product-dto';
import PageQueryDto from '../../dto/page-query-dto';

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

		const orgId = new Types.ObjectId(dto.organization);
		await this.updateTotalProductsCount(orgId);

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

	@Get('list/:id')
	async list(
		@Param('id', ParseObjectIdPipe) orgId: Types.ObjectId,
		@Query(
			ValidationPipe,
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
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(ValidationPipe) dto: UpdateProductDto,
	): Promise<ProductDto> {
		const product = await this.productsService.update(id, dto);
		if (!product) {
			throw new NotFoundException();
		}

		const orgId = new Types.ObjectId(product.organization as any);
		await this.organizationStatsService.recalculateTotalValue(orgId);

		return Product.toDto(product);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<ProductDto> {
		const product = await this.productsService.delete(id);
		if (!product) {
			throw new NotFoundException();
		}

		const orgId = product.organization as any as Types.ObjectId;

		await this.updateTotalProductsCount(orgId);
		await this.organizationStatsService.recalculateTotalValue(orgId);

		return Product.toDto(product);
	}

	private async updateTotalProductsCount(organizationId: Types.ObjectId) {
		const newCount = await this.productsService.countAll(organizationId);
		await this.organizationStatsService.updateProductsCount(organizationId, newCount);
	}
}
