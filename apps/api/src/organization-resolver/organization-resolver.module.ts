import { Module } from '@nestjs/common';
import { InventoryModule } from '../models/inventory/inventory.module';
import { ProductsModule } from '../models/products/products.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { OrganizationResolverService } from './organization-resolver.service';
import { ProductsStrategy } from './strategy/products.strategy';
import { WarehouseStrategy } from './strategy/warehouse.strategy';

@Module({
	providers: [OrganizationResolverService, ProductsStrategy, WarehouseStrategy],
	imports: [ProductsModule, InventoryModule, WarehousesModule],
	exports: [OrganizationResolverService],
})
export class OrganizationResolverModule {}
