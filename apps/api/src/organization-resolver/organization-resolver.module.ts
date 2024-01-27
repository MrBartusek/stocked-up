import { Module } from '@nestjs/common';
import { OrganizationResolverService } from './organization-resolver.service';
import { ProductsStrategy } from './strategy/products.strategy';
import { ProductsModule } from '../models/products/products.module';
import { InventoryModule } from '../models/inventory/inventory.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { WarehouseStrategy } from './strategy/warehouse.strategy';

@Module({
	providers: [OrganizationResolverService, ProductsStrategy, WarehouseStrategy],
	imports: [ProductsModule, InventoryModule, WarehousesModule],
	exports: [OrganizationResolverService],
})
export class OrganizationResolverModule {}
