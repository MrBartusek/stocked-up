import {
	ORGANIZATION_ACCESS_DECORATOR_KEY,
	OrganizationAccessDecoratorMetadata,
} from './types/org-access-decorator-metadata';
import { OrganizationACLRole } from './types/org-acl-role.type';
import { OrganizationResourceType } from './types/org-resource-type';

export interface BasicOrganizationAccessDecoratorOptions {
	target: object;
	key: string | symbol;
	resource: OrganizationResourceType;
	role?: OrganizationACLRole;
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
		role: role || OrganizationACLRole.MEMBER,
	};

	Reflect.defineMetadata(ORGANIZATION_ACCESS_DECORATOR_KEY, metadata, target, key);
}
