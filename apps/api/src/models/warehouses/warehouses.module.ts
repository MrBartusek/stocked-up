import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { WarehousesRepository } from './warehouses.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
	controllers: [WarehousesController],
	providers: [WarehousesService, WarehousesRepository],
})
export class WarehousesModule {}
