import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { InventoryModule } from '../models/inventory/inventory.module';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { ProductsModule } from '../models/products/products.module';
import { UsersModule } from '../models/users/users.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';

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
	controllers: [DemoController],
})
export class DemoModule {}
