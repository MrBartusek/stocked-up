import { IsEmail, IsMongoId } from 'class-validator';
import { ICreateSecurityRuleDto } from 'shared-types';
import { OrganizationAclRole } from '../../models/organizations/types/org-acl-role.type';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';

export class CreateSecurityRuleDto implements ICreateSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationAclRole.ADMIN)
	organization: string;

	@IsEmail()
	email: string;
}
