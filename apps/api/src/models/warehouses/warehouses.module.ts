import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { InventoryModule } from '../inventory/inventory.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseStatsService } from './warehouses-stats.service';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { SecurityModule } from '../../security/security.module';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Warehouse, WarehouseSchema),
		forwardRef(() => OrganizationsModule),
		forwardRef(() => InventoryModule),
		SecurityModule,
		forwardRef(() => OrganizationResolverModule),
	],
	controllers: [WarehousesController],
	providers: [WarehousesService, WarehouseRepository, WarehouseStatsService],
	exports: [WarehousesService, WarehouseStatsService],
})
export class WarehousesModule {}
