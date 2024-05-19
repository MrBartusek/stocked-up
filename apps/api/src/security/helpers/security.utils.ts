import { OrganizationSecurityRole } from 'shared-types';

export class SecurityUtils {
	static canManageRole(requester: OrganizationSecurityRole, target: OrganizationSecurityRole) {
		return this.aclRoleToNumber(requester) > this.aclRoleToNumber(target);
	}

	static isRoleEnough(current: OrganizationSecurityRole, required: OrganizationSecurityRole) {
		return this.aclRoleToNumber(current) >= this.aclRoleToNumber(required);
	}

	static aclRoleToNumber(role: OrganizationSecurityRole) {
		switch (role) {
			case OrganizationSecurityRole.OWNER:
				return 3;
			case OrganizationSecurityRole.ADMIN:
				return 2;
			case OrganizationSecurityRole.MEMBER:
				return 1;
			default:
				return 0;
		}
	}
}
