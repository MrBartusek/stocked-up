import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { WarehouseDto } from 'shared-types';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { Types } from 'mongoose';

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
}
