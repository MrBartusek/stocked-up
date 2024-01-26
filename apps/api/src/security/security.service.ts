import { Injectable } from '@nestjs/common';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { Types } from 'mongoose';
import { OrganizationAclRole } from '../models/organizations/types/org-acl-role.type';

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
}
