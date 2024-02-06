import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { OrganizationAclRole } from '../models/organizations/types/org-acl-role.type';
import { PageQueryDto } from '../dto/page-query.dto';

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

	async paginateMembers(organization: Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationAclService.paginateRules(organization, pageQueryDto);
	}
}
