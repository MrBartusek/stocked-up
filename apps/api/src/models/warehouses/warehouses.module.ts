import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
	controllers: [WarehousesController],
	providers: [WarehousesService, WarehouseRepository],
	exports: [WarehousesService],
})
export class WarehousesModule {}
