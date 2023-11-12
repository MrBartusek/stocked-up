import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { Organization, OrganizationSchema } from './schemas/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehousesModule } from '../warehouses/warehouses.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
		WarehousesModule,
	],
	controllers: [OrganizationsController],
	providers: [OrganizationsService, OrganizationRepository],
	exports: [OrganizationsService],
})
export class OrganizationsModule {}
