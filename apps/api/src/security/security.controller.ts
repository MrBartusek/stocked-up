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

type SecurityDtoLike = CreateSecurityRuleDto | UpdateSecurityRuleDto | DeleteSecurityRuleDto;

@Controller('security')
export class SecurityController {
	constructor(private readonly securityService: SecurityService) {}

	@Post()
	async create(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: CreateSecurityRuleDto,
	): Promise<any> {
		await this.validateIfCanManageRole(dto, request);

		const exist = await this.securityService.ruleExist(dto);
		if (exist) {
			throw new BadRequestException('This user is already member of this organization');
		}

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

	private async validateIfCanManageRole(dto: SecurityDtoLike, request: Request) {
		const org = new Types.ObjectId(dto.organization);
		const requester = new Types.ObjectId(request.user.id);
		const requesterRole = await this.securityService.getUserRole(org, requester);

		let currentRole = (dto as CreateSecurityRuleDto | UpdateSecurityRuleDto).role;
		if (!currentRole) {
			const user = new Types.ObjectId(dto.user);
			currentRole = await this.securityService.getUserRole(org, user);
		}

		const canCreate = SecurityUtils.canManageRole(requesterRole, currentRole);
		if (!canCreate) {
			throw new ForbiddenException('Your security role is not enough to manage this role');
		}
	}
}
