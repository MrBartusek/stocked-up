import { Controller, Get, Param, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { PageDto, SecurityRuleDto } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { PageQueryValidationPipe } from '../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
	constructor(private readonly securityService: SecurityService) {}

	@Get(':id')
	async listRules(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) organization: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<SecurityRuleDto>({
				allowedFilters: ['role'],
				disableTextSearch: true,
			}),
		)
		pageQuery: PageQueryDto<SecurityRuleDto>,
	): Promise<PageDto<any>> {
		return this.securityService.paginateMembers(organization, pageQuery);
	}
}
