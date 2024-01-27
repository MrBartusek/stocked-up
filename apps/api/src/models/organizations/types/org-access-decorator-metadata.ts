import { OrganizationAclRole } from './org-acl-role.type';
import { OrganizationResourceType } from '../../../organization-resolver/types/organization-resource.type';

export const ORGANIZATION_ACCESS_DECORATOR_KEY = Symbol('custom:organization-access');

export interface OrganizationAccessDecoratorMetadata {
	resource: OrganizationResourceType;
	role: OrganizationAclRole;
}
