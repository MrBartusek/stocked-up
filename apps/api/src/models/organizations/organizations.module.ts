import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { OrganizationNameNotTakenRule } from '../../rules/org-name-not-taken.rule';
import { SecurityModule } from '../../security/security.module';
import { ProductsModule } from '../products/products.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Organization, OrganizationSchema),
		forwardRef(() => WarehousesModule),
		forwardRef(() => ProductsModule),
		SecurityModule,
	],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		OrganizationRepository,
		OrganizationsAclService,
		OrganizationsStatsService,
		OrganizationNameNotTakenRule,
	],
	exports: [OrganizationsService, OrganizationsStatsService, OrganizationsAclService],
})
export class OrganizationsModule {}
