import { IsEnum, IsMongoId } from 'class-validator';
import { IUpdateSecurityRuleDto } from 'shared-types';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';

export class UpdateSecurityRuleDto implements IUpdateSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationAclRole.ADMIN)
	organization: string;

	user: string;

	@IsEnum(OrganizationAclRole)
	role: OrganizationAclRole;
}
