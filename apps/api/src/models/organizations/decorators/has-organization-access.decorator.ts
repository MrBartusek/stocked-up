import { organizationAccessDecoratorHelper } from '../organization-acccess-decorator.helper';
import { OrganizationACLRole } from '../types/org-acl-role.type';
import { OrganizationResourceType } from '../types/org-resource-type';

export function HasOrganizationAccess(role?: OrganizationACLRole): PropertyDecorator {
	return (target, key) => {
		organizationAccessDecoratorHelper({
			target,
			key,
			resource: OrganizationResourceType.ORGANIZATION,
			role,
		});
	};
}
