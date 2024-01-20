import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organizations.repository';
import { Types } from 'mongoose';
import { OrganizationDocument } from './schemas/organization.schema';
import { OrganizationACLRole } from './schemas/org-acl-role';

export interface AccessRule {
	user: Types.ObjectId;
	role: OrganizationACLRole;
}

@Injectable()
export class OrganizationsSecurityService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

	async getRole(
		organizationId: Types.ObjectId,
		user: Types.ObjectId,
	): Promise<OrganizationACLRole | null> {
		const organization = await this.organizationRepository.findById(organizationId, { acls: 1 });
		const rule = organization.acls.find((rule) => rule.user == user);
		return rule ? rule.role : null;
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
