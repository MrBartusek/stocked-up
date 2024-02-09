import { IsMongoId } from 'class-validator';
import { IDeleteSecurityRuleDto, OrganizationSecurityRole } from 'shared-types';
import { HasOrganizationAccess } from '../decorators/has-organization-access.decorator';

export class DeleteSecurityRuleDto implements IDeleteSecurityRuleDto {
	@IsMongoId()
	@HasOrganizationAccess(OrganizationSecurityRole.ADMIN)
	organization: string;

	@IsMongoId()
	user: string;
}
