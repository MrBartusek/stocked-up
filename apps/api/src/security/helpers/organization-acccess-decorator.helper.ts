import {
	ORGANIZATION_ACCESS_DECORATOR_KEY,
	OrganizationAccessDecoratorMetadata,
} from '../../models/organizations/types/org-access-decorator-metadata';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { OrganizationResourceType } from './org-resource-type';

export interface BasicOrganizationAccessDecoratorOptions {
	target: object;
	key: string | symbol;
	resource: OrganizationResourceType;
	role?: OrganizationAclRole;
}

export function organizationAccessDecoratorHelper(
	options: BasicOrganizationAccessDecoratorOptions,
) {
	const { target, key, resource, role } = options;

	const fields = Reflect.getOwnMetadata(ORGANIZATION_ACCESS_DECORATOR_KEY, target) || [];
	if (!fields.includes(key)) {
		fields.push(key);
	}

	const metadata: OrganizationAccessDecoratorMetadata = {
		resource,
		role: role || OrganizationAclRole.MEMBER,
	};

	Reflect.defineMetadata(ORGANIZATION_ACCESS_DECORATOR_KEY, metadata, target, key);
}
