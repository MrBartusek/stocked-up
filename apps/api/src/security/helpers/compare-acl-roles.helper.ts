import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';

export function compareAclRoles(current: OrganizationAclRole, required: OrganizationAclRole) {
	return aclRoleToNumber(current) >= aclRoleToNumber(required);
}

function aclRoleToNumber(role: OrganizationAclRole) {
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
