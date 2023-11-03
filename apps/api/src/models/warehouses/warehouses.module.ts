import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { WarehouseRepository } from './warehouse.repository';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }])],
	controllers: [WarehousesController],
	providers: [WarehousesService, WarehouseRepository],
	exports: [WarehousesService],
})
export class WarehousesModule {}
