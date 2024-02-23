import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationNameNotTakenRule } from '../../rules/org-name-not-taken.rule';
import { SecurityModule } from '../../security/security.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { WarehouseCreatedListener } from './listeners/warehouse-created.listener';
import { WarehouseDeletedListener } from './listeners/warehouse-deleted.listener';
import { WarehouseUpdatedListener } from './listeners/warehouse-updated.listener';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsWarehouseRefService } from './organizations-warehouse-ref.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { UserDeletedListener } from './listeners/user-deleted.listener';
import { WarehouseRecalculatedListener } from './listeners/warehouse-recalculated.listener';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Organization, OrganizationSchema),
		forwardRef(() => SecurityModule),
		forwardRef(() => WarehousesModule),
	],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		OrganizationRepository,
		OrganizationsAclService,
		OrganizationsStatsService,
		OrganizationNameNotTakenRule,
		OrganizationsWarehouseRefService,
		WarehouseCreatedListener,
		WarehouseUpdatedListener,
		WarehouseDeletedListener,
		UserDeletedListener,
		WarehouseRecalculatedListener,
	],
	exports: [OrganizationsService, OrganizationsStatsService, OrganizationsAclService],
})
export class OrganizationsModule {}
