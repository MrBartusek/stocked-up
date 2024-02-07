import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PageDto, SecurityRuleDto } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { PageQueryValidationPipe } from '../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { DeleteSecurityRuleDto } from './dto/delete-security-rule.dto';
import { UpdateSecurityRuleDto } from './dto/update-security-rule.dto';
import { SecurityUtils } from './helpers/security.utils';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { SecurityValidationPipe } from './pipes/security-validation.pipe';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
	constructor(private readonly securityService: SecurityService) {}

	@Post()
	async create(@Body(SecurityValidationPipe) dto: CreateSecurityRuleDto): Promise<any> {
		const resultOrg = await this.securityService.addRule(dto);
		if (!resultOrg) {
			throw new NotFoundException();
		}
		return { statusCode: 201 };
	}

	@Put()
	async update(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: UpdateSecurityRuleDto,
	): Promise<any> {
		await this.validateIfCanManageRole(dto, request);
		const org = await this.securityService.updateRule(dto);
		if (!org) {
			throw new NotFoundException();
		}
		return { statusCode: 200 };
	}

	@Delete()
	async delete(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: DeleteSecurityRuleDto,
	): Promise<any> {
		await this.validateIfCanManageRole(dto, request);
		const org = await this.securityService.deleteRule(dto);
		if (!org) {
			throw new NotFoundException();
		}
		return { statusCode: 200 };
	}

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

	private async validateIfCanManageRole(
		dto: UpdateSecurityRuleDto | DeleteSecurityRuleDto,
		request: Request,
	) {
		const org = new Types.ObjectId(dto.organization);
		const requester = new Types.ObjectId(request.user.id);
		const requesterRole = await this.securityService.getUserRole(org, requester);
		const target = new Types.ObjectId(dto.user);

		if (requester.equals(target)) {
			throw new BadRequestException('You cannot change your own security rules');
		}

		let currentRole = (dto as UpdateSecurityRuleDto).role;
		if (!currentRole) {
			currentRole = await this.securityService.getUserRole(org, target);
		}

		const canCreate = SecurityUtils.canManageRole(requesterRole, currentRole);
		if (!canCreate) {
			throw new ForbiddenException('Your security role is not enough to manage this role');
		}
	}
}
