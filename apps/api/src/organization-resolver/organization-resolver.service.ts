import { Injectable } from '@nestjs/common';
import { ProductsStrategy } from './strategy/products.strategy';
import { Types } from 'mongoose';
import { OrganizationResourceType } from './types/organization-resource.type';
import { ResolverStrategy } from './types/resolver-strategy.type';
import { WarehouseStrategy } from './strategy/warehouse.strategy';
import { OrganizationStrategy } from './strategy/organization.strategy';
import { InventoryStrategy } from './strategy/inventory.strategy';

@Injectable()
export class OrganizationResolverService {
	constructor(
		private readonly productStrategy: ProductsStrategy,
		private readonly warehouseStrategy: WarehouseStrategy,
		private readonly organizationStrategy: OrganizationStrategy,
		private readonly inventoryStrategy: InventoryStrategy,
	) {}

	private strategy: ResolverStrategy;

	public resolve(entity: Types.ObjectId, type: OrganizationResourceType): Promise<Types.ObjectId> {
		this.setStrategy(type);
		return this.strategy.resolve(entity);
	}

	private setStrategy(type: OrganizationResourceType): ResolverStrategy {
		switch (type) {
			case OrganizationResourceType.ORGANIZATION:
				return (this.strategy = this.organizationStrategy);
			case OrganizationResourceType.PRODUCT:
				return (this.strategy = this.productStrategy);
			case OrganizationResourceType.WAREHOUSE:
				return (this.strategy = this.warehouseStrategy);
			case OrganizationResourceType.INVENTORY:
				return (this.strategy = this.inventoryStrategy);
			default:
				throw new Error(`Strategy for ${type} is not implemented`);
		}
	}
}
