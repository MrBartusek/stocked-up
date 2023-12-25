import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongose-module-helper';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ProductsModule } from '../products/products.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { InventoryStatsService } from './inventory-stats.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(InventoryItem, InventoryItemSchema),
		forwardRef(() => ProductsModule),
		forwardRef(() => WarehousesModule),
		forwardRef(() => OrganizationsModule),
	],
	controllers: [InventoryController],
	providers: [InventoryService, InventoryRepository, InventoryStatsService],
	exports: [InventoryService, InventoryStatsService],
})
export class InventoryModule {}
