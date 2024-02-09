import { Module, Provider, forwardRef } from '@nestjs/common';
import { InventoryModule } from '../models/inventory/inventory.module';
import { ProductsModule } from '../models/products/products.module';
import { WarehousesModule } from '../models/warehouses/warehouses.module';
import { OrganizationResolverService } from './organization-resolver.service';
import { InventoryStrategy } from './strategy/inventory.strategy';
import { OrganizationStrategy } from './strategy/organization.strategy';
import { ProductsStrategy } from './strategy/products.strategy';
import { WarehouseStrategy } from './strategy/warehouse.strategy';

const STRATEGY_LIST: Provider[] = [
	ProductsStrategy,
	WarehouseStrategy,
	OrganizationStrategy,
	InventoryStrategy,
];

@Module({
	providers: [OrganizationResolverService, ...STRATEGY_LIST],
	imports: [
		forwardRef(() => ProductsModule),
		forwardRef(() => InventoryModule),
		forwardRef(() => WarehousesModule),
	],
	exports: [OrganizationResolverService],
})
export class OrganizationResolverModule {}
