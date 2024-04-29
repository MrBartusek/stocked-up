import { Injectable } from '@nestjs/common';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { PageQueryDto } from '../../../dto/page-query.dto';
import { MockEntityRepository } from '../../../mocks/mock-entity-repository';
import { OrgValueCalculationStrategy } from '../schemas/org-settings';
import { Organization } from '../schemas/organization.schema';

@Injectable()
export class MockOrganizationsRepository extends MockEntityRepository<Organization> {
	constructor() {
		super({
			name: 'test-name',
			stats: {
				totalQuantity: 100,
				totalProducts: 100,
				totalValue: 100,
			},
			settings: {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
				currency: 'USD',
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

	async paginateAcls(match: FilterQuery<Organization>, pageQueryDto: PageQueryDto) {
		const paginateResult = await this.paginate(match, pageQueryDto);
		return {
			...paginateResult,
			items: paginateResult.items.flatMap((org) => org.acls),
		};
	}
}
