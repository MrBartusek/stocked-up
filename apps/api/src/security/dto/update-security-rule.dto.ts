import { IsEnum, IsMongoId } from 'class-validator';
import { IUpdateSecurityRuleDto, OrganizationSecurityRole } from 'shared-types';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';

export class UpdateSecurityRuleDto implements IUpdateSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationSecurityRole.ADMIN)
	organization: string;

	@IsMongoId()
	user: string;

	@IsEnum(OrganizationSecurityRole)
	role: OrganizationSecurityRole;
}
