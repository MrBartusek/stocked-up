import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PageQueryValidationPipe } from '../pipes/page-query-validation.pipe';
import { PageDto, OrganizationSecurityRuleDto } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { Types } from 'mongoose';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
	constructor(private readonly securityService: SecurityService) {}

	@Get(':id')
	async listRules(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) organization: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<OrganizationSecurityRuleDto>({
				allowedFilters: ['role'],
				disableTextSearch: true,
			}),
		)
		pageQuery: PageQueryDto<OrganizationSecurityRuleDto>,
	): Promise<PageDto<any>> {
		return this.securityService.paginateMembers(organization, pageQuery);
	}
}
