import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { PageQueryDto } from '../../dto/page-query.dto';
import { Organization, OrganizationDocument } from './schemas/organization.schema';

@Injectable()
export class OrganizationRepository extends EntityRepository<OrganizationDocument> {
	constructor(@InjectModel(Organization.name) userModel: Model<OrganizationDocument>) {
		super(userModel);
	}

	async paginateAcls(match: FilterQuery<OrganizationDocument>, pageQueryDto: PageQueryDto) {
		const organization = await this.paginate(
			[
				{
					$match: match,
				},
				{
					$unwind: '$acls',
				},
				{
					$replaceRoot: {
						newRoot: '$acls',
					},
				},
			],
			pageQueryDto,
		);
		return organization;
	}
}
