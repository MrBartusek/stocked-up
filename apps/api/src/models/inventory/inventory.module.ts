import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationsModule } from '../organizations/organizations.module';
import { InventoryStatsService } from './inventory-stats.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';
import { SecurityModule } from '../../security/security.module';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(InventoryItem, InventoryItemSchema),
		forwardRef(() => OrganizationsModule),
		SecurityModule,
		forwardRef(() => OrganizationResolverModule),
	],
	controllers: [InventoryController],
	providers: [InventoryService, InventoryRepository, InventoryStatsService],
	exports: [InventoryService, InventoryStatsService],
})
export class InventoryModule {}
