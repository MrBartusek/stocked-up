import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehousesController {
	constructor(private readonly warehousesService: WarehousesService) {}

	@Post()
	create(@Body() createWarehouseDto: CreateWarehouseDto) {
		return this.warehousesService.create(createWarehouseDto);
	}

	@Get()
	findAll() {
		return this.warehousesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.warehousesService.findById(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
		return this.warehousesService.update(id, updateWarehouseDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.warehousesService.remove(id);
	}
}
