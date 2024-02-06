import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationDocument } from './schemas/organization.schema';
import { OrganizationAclRole } from './types/org-acl-role.type';
import { PageQueryDto } from '../../dto/page-query.dto';

export interface AccessRule {
	user: Types.ObjectId;
	role: OrganizationAclRole;
}

@Injectable()
export class OrganizationsAclService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

	async getRule(organizationId: Types.ObjectId, user: Types.ObjectId): Promise<AccessRule | null> {
		const organization = await this.organizationRepository.findById(organizationId, { acls: 1 });
		if (!organization) return null;
		const rule = organization.acls.find((rule) => rule.user.equals(user));
		return rule;
	}

	async addRule(organization: Types.ObjectId, rule: AccessRule): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organization },
			{
				$push: {
					acls: rule,
				},
			},
		);
	}

	async removeRule(
		organization: Types.ObjectId,
		user: Types.ObjectId,
	): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organization },
			{
				$pull: {
					acls: {
						id: user,
					},
				},
			},
		);
	}

	async paginateRules(organization: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginateAcls({ _id: organization }, pageQueryDto);
	}
}
