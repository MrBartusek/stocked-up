import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';
import { SecurityModule } from '../../security/security.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { InventoryEventListener } from './listeners/inventory-events.listener';
import { OrganizationDeletedListener } from './listeners/organization-deleted.listener';
import { OrganizationSettingsUpdatedListener } from './listeners/organization-settings-updated.listener';
import { ProductUpdatedListener } from './listeners/product-events.listener';
import { WarehouseRecalculateProcessor } from './processors/warehouse-recalculate.processor';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';
import { WarehouseStatsService } from './warehouse-stats.service';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Warehouse, WarehouseSchema),
		BullModule.registerQueue({
			name: 'warehouse-recalculate',
		}),
		forwardRef(() => OrganizationsModule),
		forwardRef(() => InventoryModule),
		forwardRef(() => SecurityModule),
		forwardRef(() => OrganizationResolverModule),
	],
	controllers: [WarehousesController],
	providers: [
		WarehousesService,
		WarehouseRepository,
		OrganizationDeletedListener,
		InventoryEventListener,
		ProductUpdatedListener,
		OrganizationSettingsUpdatedListener,
		WarehouseStatsService,
		WarehouseRecalculateProcessor,
	],
	exports: [WarehousesService],
})
export class WarehousesModule {}
