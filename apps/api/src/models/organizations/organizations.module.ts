import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { OrganizationsController } from './organizations.controller';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';

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
