import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateWarehouseInOrgDto, UpdateWarehouseDto, WarehouseDto } from 'shared-types';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { InventoryService } from '../inventory/inventory.service';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
	constructor(
		private readonly warehousesService: WarehousesService,
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsStatsService: OrganizationsStatsService,
		private readonly inventoryService: InventoryService,
	) {}

	@Post()
	async create(@Body(ValidationPipe) dto: CreateWarehouseInOrgDto): Promise<WarehouseDto> {
		const orgId = new Types.ObjectId(dto.organizationId);

		const orgExist = this.organizationsService.exist(orgId);
		if (!orgExist) {
			throw new NotFoundException("Organization with provided id doesn't exist");
		}

		const warehouse = await this.warehousesService.create(dto.warehouse);
		await this.organizationsService.addWarehouseReference(orgId, warehouse);

		return Warehouse.toDto(warehouse);
	}

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.findById(id);
		if (!warehouse) {
			throw new NotFoundException();
		}

		return Warehouse.toDto(warehouse);
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(ValidationPipe) dto: UpdateWarehouseDto,
	): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.update(id, dto);
		if (!warehouse) {
			throw new NotFoundException();
		}

		await this.organizationsService.updateWarehouseReference(warehouse);

		return Warehouse.toDto(warehouse);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.delete(id);
		if (!warehouse) {
			throw new NotFoundException();
		}

		const org = await this.organizationsService.deleteWarehouseReference(warehouse._id);
		await this.inventoryService.deleteManyByWarehouse(warehouse._id);
		await this.organizationsStatsService.recalculateTotalValue(org._id);

		return Warehouse.toDto(warehouse);
	}
}
