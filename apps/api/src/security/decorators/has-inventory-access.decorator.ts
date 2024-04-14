import { OrganizationSecurityRole } from 'shared-types';
import { OrganizationResourceType } from '../../organization-resolver/types/organization-resource.type';
import { addSecurityMetadata } from '../helpers/organization-acccess-decorator.helper';

export function HasInventoryAccess(role?: OrganizationSecurityRole): PropertyDecorator {
	return (target, key) => {
		addSecurityMetadata({
			target,
			key,
			resource: OrganizationResourceType.INVENTORY,
			role,
		});
	};
}
