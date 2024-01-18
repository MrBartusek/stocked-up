import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
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
import {
	BasicInventoryItemDto,
	CreateInventoryItemDto,
	InventoryItemDto,
	PageDto,
	UpdateInventoryItemDto,
} from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './schemas/inventory-item.schema';
import { PageQueryDto } from '../../dto/page-query.dto';

@ApiTags('inventory')
@UseGuards(AuthenticatedGuard)
@Controller('inventory')
export class InventoryController {
	constructor(
		private readonly inventoryService: InventoryService,
		private readonly warehousesService: WarehousesService,
		private readonly productService: ProductsService,
		private readonly organizationStatsService: OrganizationsStatsService,
	) {}

	@Post()
	async create(@Body(ValidationPipe) dto: CreateInventoryItemDto) {
		const warehouseId = new Types.ObjectId(dto.warehouseId);
		const productId = new Types.ObjectId(dto.productId);

		const warehouse = await this.warehousesService.findById(warehouseId);
		if (!warehouse) {
			throw new BadRequestException("This warehouse doesn't exist");
		}

		const productExist = await this.productService.exist(productId);
		if (!productExist) {
			throw new BadRequestException("This product doesn't exist");
		}

		const itemExist = await this.inventoryService.findByProduct(warehouseId, productId);
		if (itemExist) {
			throw new BadRequestException(
				'The inventory item of this product in this warehouse already exist',
			);
		}

		const item = await this.inventoryService.create(dto);
		await this.organizationStatsService.recalculateTotalValue(warehouse.organization);

		return InventoryItem.toBasicDto(item);
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(ValidationPipe) dto: UpdateInventoryItemDto,
	) {
		const item = await this.inventoryService.update(id, dto);
		if (!item) {
			throw new NotFoundException();
		}

		const warehouseId = new Types.ObjectId(item.warehouse as any);
		const warehouse = await this.warehousesService.findById(warehouseId);
		await this.organizationStatsService.recalculateTotalValue(warehouse.organization);

		return InventoryItem.toBasicDto(item);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
		const item = await this.inventoryService.delete(id);
		if (!item) {
			throw new NotFoundException();
		}

		const warehouseId = new Types.ObjectId(item.warehouse as any);
		const warehouse = await this.warehousesService.findById(warehouseId);
		await this.organizationStatsService.recalculateTotalValue(warehouse.organization);

		return InventoryItem.toBasicDto(item);
	}

	@Get('by-product')
	async findByProduct(
		@Query('warehouseId', ParseObjectIdPipe) warehouseId: Types.ObjectId,
		@Query('productId', ParseObjectIdPipe) productId: Types.ObjectId,
	): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findByProduct(warehouseId, productId);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}

	@Get('by-warehouse/:id')
	async list(
		@Param('id', ParseObjectIdPipe) warehouseId: Types.ObjectId,
		@Query(
			ValidationPipe,
			new PageQueryValidationPipe<BasicInventoryItemDto>({
				allowedFilters: ['quantity'],
				disableTextSearch: true,
			}),
		)
		pageQuery: PageQueryDto<BasicInventoryItemDto>,
	): Promise<PageDto<BasicInventoryItemDto>> {
		const { items, meta } = await this.inventoryService.listByWarehouse(warehouseId, pageQuery);

		const itemDTOs = items.map((product) => InventoryItem.toBasicDto(product));
		return {
			meta,
			items: itemDTOs,
		};
	}

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findOne(id);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}
}
