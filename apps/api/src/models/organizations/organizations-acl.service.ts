import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organizations.repository';
import { Types } from 'mongoose';
import { OrganizationDocument } from './schemas/organization.schema';
import { OrganizationAclRole } from './types/org-acl-role.type';

export interface AccessRule {
	user: Types.ObjectId;
	role: OrganizationAclRole;
}

@Injectable()
export class OrganizationsAclService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

	async getRule(organizationId: Types.ObjectId, user: Types.ObjectId): Promise<AccessRule | null> {
		const organization = await this.organizationRepository.findById(organizationId, { acls: 1 });
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
}
