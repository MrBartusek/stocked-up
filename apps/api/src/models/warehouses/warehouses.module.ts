import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }]),
		forwardRef(() => OrganizationsModule),
	],
	controllers: [WarehousesController],
	providers: [WarehousesService, WarehouseRepository],
	exports: [WarehousesService],
})
export class WarehousesModule {}
