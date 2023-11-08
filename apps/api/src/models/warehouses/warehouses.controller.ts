import { Controller, Post, Req } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { Request } from 'express';
import { WarehouseDto } from 'shared-types';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { BasicWarehouseDto } from 'shared-types/dist/BasicWarehouseDto';

@Controller('warehouses')
export class WarehousesController {
	constructor(private readonly warehousesService: WarehousesService) {}
}
