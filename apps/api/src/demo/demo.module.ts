import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { UsersModule } from '../models/users/users.module';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { ProductsModule } from '../models/products/products.module';
import { InventoryModule } from '../models/inventory/inventory.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	providers: [DemoService],
	imports: [
		ScheduleModule.forRoot(),
		UsersModule,
		OrganizationsModule,
		WarehousesModule,
		ProductsModule,
		InventoryModule,
	],
	exports: [DemoService],
})
export class DemoModule {}
