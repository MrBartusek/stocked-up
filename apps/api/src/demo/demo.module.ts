import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { UsersModule } from '../models/users/users.module';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { ProductsModule } from '../models/products/products.module';
import { InventoryModule } from '../models/inventory/inventory.module';

@Module({
	providers: [DemoService],
	imports: [UsersModule, OrganizationsModule, WarehousesModule, ProductsModule, InventoryModule],
	exports: [DemoService],
})
export class DemoModule {}