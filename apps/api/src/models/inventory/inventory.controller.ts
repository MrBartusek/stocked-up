import {
	BadRequestException,
	Body,
	Controller,
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
	UpdateInventoryItemDto,
} from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationDocument } from '../organizations/schemas/organization.schema';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './schemas/inventory-item.schema';

@ApiTags('inventory')
@UseGuards(AuthenticatedGuard)
@Controller('inventory')
export class InventoryController {
	constructor(
		private readonly inventoryService: InventoryService,
		private readonly warehousesService: WarehousesService,
		private readonly productService: ProductsService,
		private readonly organizationService: OrganizationsService,
		private readonly organizationStatsService: OrganizationsStatsService,
	) {}

	@Post()
	async create(@Body(ValidationPipe) dto: CreateInventoryItemDto) {
		const warehouseId = new Types.ObjectId(dto.warehouseId);
		const productId = new Types.ObjectId(dto.productId);

		const warehouseExist = await this.warehousesService.exist(warehouseId);
		if (!warehouseExist) {
			throw new BadRequestException("This warehouse doesn't exist");
		}

		const productExist = await this.productService.exist(productId);
		if (!productExist) {
			throw new BadRequestException("This product doesn't exist");
		}

		const item = await this.inventoryService.create(dto);
		const organization = await this.organizationService.findByWarehouse(warehouseId);
		await this.updateWarehouseValue(organization, warehouseId);

		return InventoryItem.toBasicDto(item);
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(ValidationPipe) dto: UpdateInventoryItemDto,
	) {
		const item = await this.inventoryService.update(id, dto);
		const warehouseId = new Types.ObjectId(item.warehouse as any);

		const organization = await this.organizationService.findByWarehouse(warehouseId);
		await this.updateWarehouseValue(organization, warehouseId);

		return InventoryItem.toBasicDto(item);
	}

	@Put(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
		const item = await this.inventoryService.delete(id);
		const warehouseId = new Types.ObjectId(item.warehouse as any);

		const organization = await this.organizationService.findByWarehouse(warehouseId);
		await this.updateWarehouseValue(organization, warehouseId);

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
	async findAll(
		@Param('id', ParseObjectIdPipe) warehouseId: Types.ObjectId,
	): Promise<BasicInventoryItemDto[]> {
		const items = await this.inventoryService.findAllInWarehouse(warehouseId);

		return items.map((i) => InventoryItem.toBasicDto(i));
	}

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findOne(id);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}

	async updateWarehouseValue(organization: OrganizationDocument, warehouseId: Types.ObjectId) {
		const strategy = organization.settings.valueCalculationStrategy;
		const totalValue = await this.inventoryService.calculateTotalWarehouseValue(
			warehouseId,
			strategy,
		);
		await this.warehousesService.updateTotalValue(warehouseId, totalValue);
		const orgValue = await this.organizationService.calculateTotalValue(organization._id);
		await this.organizationStatsService.updateTotalValue(organization._id, orgValue);
	}
}
