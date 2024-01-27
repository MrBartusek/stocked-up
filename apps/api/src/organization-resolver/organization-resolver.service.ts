import { Injectable } from '@nestjs/common';
import { ProductsStrategy } from './strategy/products.strategy';
import { Types } from 'mongoose';
import { OrganizationResourceType } from './types/organization-resource.type';
import { ResolverStrategy } from './types/resolver-strategy.type';
import { WarehouseStrategy } from './strategy/warehouse.strategy';

@Injectable()
export class OrganizationResolverService {
	constructor(
		private readonly productStrategy: ProductsStrategy,
		private readonly warehouseStrategy: WarehouseStrategy,
	) {}

	private strategy: ResolverStrategy;

	public resolve(entity: Types.ObjectId, type: OrganizationResourceType): Promise<Types.ObjectId> {
		this.setStrategy(type);
		return this.strategy.resolve(entity);
	}

	private setStrategy(type: OrganizationResourceType): ResolverStrategy {
		if (type == OrganizationResourceType.PRODUCT) {
			this.strategy = this.productStrategy;
		} else if (type == OrganizationResourceType.WAREHOUSE) {
			this.strategy = this.warehouseStrategy;
		} else {
			throw new Error(`Strategy for ${type} is not implemented`);
		}

		return this.strategy;
	}
}
