import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PageQueryDto } from '../dto/page-query.dto';
import {
	AccessRule,
	OrganizationsAclService,
} from '../models/organizations/organizations-acl.service';
import { OrganizationAclRole } from '../models/organizations/types/org-acl-role.type';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { UpdateSecurityRuleDto } from './dto/update-security-rule.dto';
import { DeleteSecurityRuleDto } from './dto/delete-security-rule.dto';

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
	): Promise<OrganizationAclRole> {
		const rule = await this.organizationAclService.getRule(organization, user);
		return rule ? rule.role : null;
	}

	async addRule(dto: CreateSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const user = new Types.ObjectId(dto.user);

		return this.organizationAclService.addRule(org, {
			user,
			role: dto.role,
		});
	}

	async updateRule(dto: UpdateSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const user = new Types.ObjectId(dto.user);

		return this.organizationAclService.updateRule(org, user, dto.role);
	}

	async deleteRule(dto: DeleteSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const user = new Types.ObjectId(dto.user);

		return this.organizationAclService.deleteRule(org, user);
	}

	async paginateMembers(org: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationAclService.paginateRules(org, pageQueryDto);
	}

	async ruleExist(dto: CreateSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const user = new Types.ObjectId(dto.user);

		return this.organizationAclService.ruleExist(org, user);
	}
}
