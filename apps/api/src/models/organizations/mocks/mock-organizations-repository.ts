import { Injectable } from '@nestjs/common';
import { Types, UpdateQuery } from 'mongoose';
import { MockEntityRepository } from '../../../mocks/mock-entity-repository';
import { OrgValueCalculationStrategy } from '../schemas/org-settings';
import { Organization } from '../schemas/organization.schema';
import { OrganizationSecurityRole } from 'shared-types';

@Injectable()
export class MockOrganizationsRepository extends MockEntityRepository<Organization> {
	constructor() {
		super({
			name: 'test-name',
			currency: 'USD',
			stats: {
				totalQuantity: 100,
				totalProducts: 100,
				totalValue: 100,
			},
			settings: {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			},
			acls: [
				{
					user: new Types.ObjectId(),
					role: OrganizationSecurityRole.OWNER,
				},
				{
					user: new Types.ObjectId(),
					role: OrganizationSecurityRole.ADMIN,
				},
				{
					user: new Types.ObjectId(),
					role: OrganizationSecurityRole.MEMBER,
				},
				{
					user: new Types.ObjectId(),
					role: OrganizationSecurityRole.MEMBER,
				},
			],
			warehouses: [
				{
					name: 'test-warehouse',
					id: new Types.ObjectId(),
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
