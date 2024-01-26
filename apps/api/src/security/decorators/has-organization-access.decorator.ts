import { organizationAccessDecoratorHelper } from '../organization-acccess-decorator.helper';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { OrganizationResourceType } from './org-resource-type';

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
