import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';
import { SecurityModule } from '../../security/security.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseStatsService } from './warehouses-stats.service';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { OrganizationDeletedListener } from './listeners/organization-deleted.listener';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Warehouse, WarehouseSchema),
		forwardRef(() => OrganizationsModule),
		forwardRef(() => InventoryModule),
		forwardRef(() => SecurityModule),
		forwardRef(() => OrganizationResolverModule),
	],
	controllers: [WarehousesController],
	providers: [
		WarehousesService,
		WarehouseRepository,
		WarehouseStatsService,
		OrganizationDeletedListener,
	],
	exports: [WarehousesService, WarehouseStatsService],
})
export class WarehousesModule {}
