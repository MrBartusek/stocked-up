import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';

@Injectable()
export class SecurityService {
	constructor(private readonly organizationAclService: OrganizationsAclService) {}

	async hasOrganizationAccess(
		organization: Types.ObjectId,
		user: Types.ObjectId,
	): Promise<boolean> {
		const role = await this.getUserRole(organization, user);
		return role != null;
	}

	async getUserRole(
		organization: Types.ObjectId,
		user: Types.ObjectId,
	): Promise<OrganizationSecurityRole> {
		const rule = await this.organizationAclService.getRule(organization, user);
		return rule ? rule.role : null;
	}

	async addRule(
		org: Types.ObjectId,
		user: Types.ObjectId,
		role: OrganizationSecurityRole = OrganizationSecurityRole.MEMBER,
	) {
		const ruleExist = await this.ruleExist(org, user._id);
		if (ruleExist) {
			throw new BadRequestException('This user is already a member of this organization');
		}

		return this.organizationAclService.addRule(org, {
			user: user._id,
			role,
		});
	}

	async transferOwnership(organization: Types.ObjectId, to: Types.ObjectId) {
		const owner = await this.organizationAclService.getOwner(organization);

		if (owner && owner.equals(to)) {
			throw new BadRequestException('Provided user is already owner of this organization');
		}

		const isTargetAnMember = await this.ruleExist(organization, to);
		if (!isTargetAnMember) {
			throw new BadRequestException('Provided user is not a part of this organization');
		}

		const role = await this.organizationAclService.updateRule(
			organization,
			to,
			OrganizationSecurityRole.OWNER,
		);

		if (owner) {
			await this.organizationAclService.updateRule(
				organization,
				owner,
				OrganizationSecurityRole.ADMIN,
			);
		}

		return role;
	}

	async updateRule(org: Types.ObjectId, user: Types.ObjectId, newRole: OrganizationSecurityRole) {
		return this.organizationAclService.updateRule(org, user, newRole);
	}

	async deleteRule(org: Types.ObjectId, user: Types.ObjectId) {
		return this.organizationAclService.deleteRule(org, user);
	}

	async paginateMembers(org: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationAclService.paginateRules(org, pageQueryDto);
	}

	private async ruleExist(org: Types.ObjectId, user: Types.ObjectId) {
		return this.organizationAclService.ruleExist(org, user);
	}
}
