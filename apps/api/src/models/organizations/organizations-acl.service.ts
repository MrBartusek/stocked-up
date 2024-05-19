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

	async getAllRules(organizationId: Types.ObjectId): Promise<AccessRule[] | null> {
		const organization = await this.organizationRepository.findById(organizationId, { acls: 1 });
		if (!organization) return null;
		return organization.acls;
	}

	async getRule(organizationId: Types.ObjectId, user: Types.ObjectId): Promise<AccessRule | null> {
		const allRules = await this.getAllRules(organizationId);
		if (!allRules) return null;

		const rule = allRules.find((rule) => rule.user.equals(user));
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

	async ruleExist(organizationId: Types.ObjectId, user: Types.ObjectId): Promise<boolean> {
		return this.organizationRepository.exist({ _id: organizationId, 'acls.user': user });
	}

	async paginateRules(organization: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginateAcls({ _id: organization }, pageQueryDto);
	}

	/**
	 * Get id of designated owner of organization, returns null if organization
	 * has no designated owner.
	 */
	async getOwner(organization: Types.ObjectId): Promise<Types.ObjectId> {
		const allRules = await this.getAllRules(organization);
		if (!allRules) {
			throw new Error('Organization not found');
		}

		const rule = allRules.find((rule) => rule.role == OrganizationSecurityRole.OWNER);
		return rule ? rule.user : null;
	}

	/**
	 * Checks does specified organization has a designated owner.
	 */
	async hasOwner(organization: Types.ObjectId): Promise<boolean> {
		const owner = await this.getOwner(organization);
		return owner != undefined;
	}

	/**
	 * Randomly select one member of organization to become its new owner.
	 * Useful when removing current owner user and replacing it with new one.
	 * @returns access rule for new owner.
	 */
	async randomlySelectOwner(organization: Types.ObjectId): Promise<AccessRule> {
		const hasOwner = await this.hasOwner(organization);
		if (hasOwner) {
			throw new Error('Cannot randomly select owner of organization, that already has owner');
		}

		const allRules = await this.getAllRules(organization);
		if (allRules.length == 0) {
			throw new Error('Cannot randomly select owner of organization, that has no members');
		}
		const selectedMember = allRules.at(0).user;
		await this.updateRule(organization, selectedMember, OrganizationSecurityRole.OWNER);
		return await this.getRule(organization, selectedMember);
	}
}
