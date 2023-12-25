import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import MongooseModuleHelper from '../../helpers/mongose-module-helper';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Organization, OrganizationSchema),
		forwardRef(() => WarehousesModule),
	],
	controllers: [OrganizationsController],
	providers: [OrganizationsService, OrganizationRepository, OrganizationsStatsService],
	exports: [OrganizationsService, OrganizationsStatsService],
})
export class OrganizationsModule {}
