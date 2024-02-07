import { IsEmail, IsMongoId } from 'class-validator';
import { ICreateSecurityRuleDto, OrganizationSecurityRole } from 'shared-types';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';

export class CreateSecurityRuleDto implements ICreateSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationSecurityRole.ADMIN)
	organization: string;

	@IsEmail()
	email: string;
}
