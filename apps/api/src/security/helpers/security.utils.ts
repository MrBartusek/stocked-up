import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';

export class SecurityUtils {
	static canManageRole(requester: OrganizationAclRole, target: OrganizationAclRole) {
		return this.aclRoleToNumber(requester) > this.aclRoleToNumber(target);
	}

	static isRoleEnough(current: OrganizationAclRole, required: OrganizationAclRole) {
		return this.aclRoleToNumber(current) >= this.aclRoleToNumber(required);
	}

	static aclRoleToNumber(role: OrganizationAclRole) {
		switch (role) {
			case OrganizationAclRole.OWNER:
				return 3;
			case OrganizationAclRole.ADMIN:
				return 2;
			case OrganizationAclRole.MEMBER:
				return 1;
			default:
				throw new TypeError(`Unknown ACL role: ${role}`);
		}
	}
}
