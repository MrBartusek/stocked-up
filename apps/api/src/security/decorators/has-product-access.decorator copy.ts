import { addSecurityMetadata } from '../helpers/organization-acccess-decorator.helper';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { OrganizationResourceType } from '../../organization-resolver/types/organization-resource.type';

export function HasProductAccess(role?: OrganizationAclRole): PropertyDecorator {
	return (target, key) => {
		addSecurityMetadata({
			target,
			key,
			resource: OrganizationResourceType.PRODUCT,
			role,
		});
	};
}