import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';
import { SecurityModule } from '../../security/security.module';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { ProductDeletedListener } from './listeners/product-deleted.listener';
import { WarehouseDeletedListener } from './listeners/warehouse-deleted.listener';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(InventoryItem, InventoryItemSchema),
		forwardRef(() => OrganizationResolverModule),
		forwardRef(() => SecurityModule),
	],
	controllers: [InventoryController],
	providers: [
		InventoryService,
		InventoryRepository,
		ProductDeletedListener,
		WarehouseDeletedListener,
	],
	exports: [InventoryService],
})
export class InventoryModule {}
