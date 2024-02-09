import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationDocument } from './schemas/organization.schema';

export interface AccessRule {
	user: Types.ObjectId;
	role: OrganizationSecurityRole;
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

	async ruleExist(organizationId: Types.ObjectId, user: Types.ObjectId): Promise<boolean> {
		return this.organizationRepository.exist({ _id: organizationId, 'acls.user': user });
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

	async updateRule(
		organization: Types.ObjectId,
		user: Types.ObjectId,
		role: OrganizationSecurityRole,
	): Promise<OrganizationDocument | null> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organization, 'acls.user': user },
			{
				$set: {
					'acls.$.role': role,
				},
			},
		);
	}

	async deleteRule(
		organization: Types.ObjectId,
		user: Types.ObjectId,
	): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organization, 'acls.user': user },
			{
				$pull: {
					acls: {
						user,
					},
				},
			},
		);
	}

	async paginateRules(organization: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginateAcls({ _id: organization }, pageQueryDto);
	}
}
