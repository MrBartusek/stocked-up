import { OrganizationSecurityRole } from 'shared-types';

export class SecurityUtils {
	static canManageRole(requester: OrganizationSecurityRole | string, target: string) {
		return this.aclRoleToNumber(requester) > this.aclRoleToNumber(target);
	}

	static isRoleEnough(current: OrganizationSecurityRole | string, required: string) {
		return this.aclRoleToNumber(current) >= this.aclRoleToNumber(required);
	}

	static aclRoleToNumber(role: OrganizationSecurityRole | string) {
		switch (role) {
			case 'owner':
				return 3;
			case 'admin':
				return 2;
			case 'member':
				return 1;
			default:
				throw new TypeError(`Unknown ACL role: ${role}`);
		}
	}
}
