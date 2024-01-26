import { organizationAccessDecoratorHelper } from '../helpers/organization-acccess-decorator.helper';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { OrganizationResourceType } from '../types/org-resource-type';

export function HasOrganizationAccess(role?: OrganizationAclRole): PropertyDecorator {
	return (target, key) => {
		organizationAccessDecoratorHelper({
			target,
			key,
			resource: OrganizationResourceType.ORGANIZATION,
			role,
		});
	};
}
