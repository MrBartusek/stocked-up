import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { ProductsModule } from '../products/products.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { OrganizationNameNotTakenRule } from '../../rules/org-name-not-taken.rule';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Organization, OrganizationSchema),
		forwardRef(() => WarehousesModule),
		forwardRef(() => ProductsModule),
	],
	controllers: [OrganizationsController],
	providers: [
		OrganizationsService,
		OrganizationRepository,
		OrganizationsStatsService,
		OrganizationNameNotTakenRule,
	],
	exports: [OrganizationsService, OrganizationsStatsService],
})
export class OrganizationsModule {}
