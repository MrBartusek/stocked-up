import { IDeleteSecurityRuleDto } from 'shared-types';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';
import { IsMongoId } from 'class-validator';

export class DeleteSecurityRuleDto implements IDeleteSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationAclRole.ADMIN)
	organization: string;

	@IsMongoId()
	user: string;
}
