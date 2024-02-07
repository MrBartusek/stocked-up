import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { PageQueryDto } from '../dto/page-query.dto';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { OrganizationAclRole } from '../models/organizations/types/org-acl-role.type';
import { UsersService } from '../models/users/users.service';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { DeleteSecurityRuleDto } from './dto/delete-security-rule.dto';
import { UpdateSecurityRuleDto } from './dto/update-security-rule.dto';

@Injectable()
export class SecurityService {
	constructor(
		private readonly organizationAclService: OrganizationsAclService,
		private readonly usersService: UsersService,
	) {}

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
		const user = await this.usersService.findOne(dto.email);

		if (!user) {
			throw new BadRequestException('User with provided email was not found');
		}

		const ruleExist = await this.ruleExist(org, user._id);
		if (ruleExist) {
			throw new BadRequestException('This user is already a member of this organization');
		}

		return this.organizationAclService.addRule(org, {
			user: user._id,
			role: OrganizationAclRole.MEMBER,
		});
	}

	async updateRule(dto: UpdateSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const userId = new Types.ObjectId(dto.user);
		const userExist = await this.usersService.exist(userId);

		if (!userExist) {
			throw new NotFoundException('This user was not found');
		}

		return this.organizationAclService.updateRule(org, userId, dto.role);
	}

	async deleteRule(dto: DeleteSecurityRuleDto) {
		const org = new Types.ObjectId(dto.organization);
		const user = new Types.ObjectId(dto.user);

		return this.organizationAclService.deleteRule(org, user);
	}

	async paginateMembers(org: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationAclService.paginateRules(org, pageQueryDto);
	}

	private async ruleExist(org: Types.ObjectId, user: Types.ObjectId) {
		return this.organizationAclService.ruleExist(org, user);
	}
}
