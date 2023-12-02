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
import { UpdateWarehouseDto, WarehouseDto } from 'shared-types';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
	constructor(private readonly warehousesService: WarehousesService) {}

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
		return Warehouse.toDto(warehouse);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.delete(id);
		if (!warehouse) {
			throw new NotFoundException();
		}
		return Warehouse.toDto(warehouse);
	}
}
