import { Injectable } from '@nestjs/common';
import { Types, UpdateQuery } from 'mongoose';
import { MockEntityRepository } from '../../../mocks/mock-entity-repistory';
import { OrgValueCalculationStrategy } from '../schemas/org-settings';
import { Organization } from '../schemas/organization.schema';

@Injectable()
export class MockOrganizationsRepository extends MockEntityRepository<Organization> {
	constructor() {
		super({
			name: 'test-name',
			currency: 'USD',
			stats: { totalQuantityInHand: 100, totalProducts: 100, totalValue: 100 },
			settings: { valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice },
			acls: [],
			warehouses: [
				{
					name: 'test-warehouse',
					id: new Types.ObjectId() as any,
				},
			],
		});
	}

	findOneByIdAndUpdate(
		id: Types.ObjectId,
		updateEntityData: UpdateQuery<Organization>,
	): Promise<Partial<Organization>> {
		if (updateEntityData.$set) {
			return { ...this.findById(id), ...updateEntityData.$set };
		} else if (updateEntityData.$push) {
			return this.findById(id);
		}
		return { ...this.findById(id), ...updateEntityData };
	}
}
