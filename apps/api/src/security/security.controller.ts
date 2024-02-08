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
import { OrganizationSecurityRole, PageDto, SecurityRuleDto } from 'shared-types';
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
import { UsersService } from '../models/users/users.service';

@Controller('security')
export class SecurityController {
	constructor(
		private readonly securityService: SecurityService,
		private readonly usersService: UsersService,
	) {}

	@Post()
	async create(@Body(SecurityValidationPipe) dto: CreateSecurityRuleDto): Promise<any> {
		const org = new Types.ObjectId(dto.organization);

		const user = await this.usersService.findOne(dto.email);
		if (!user) {
			throw new NotFoundException('This user does not exist');
		}

		const resultOrg = await this.securityService.addRule(org, user._id);
		if (!resultOrg) {
			throw new NotFoundException('This organization does not exist');
		}

		return { statusCode: 201 };
	}

	@Put()
	async update(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: UpdateSecurityRuleDto,
	): Promise<any> {
		const org = new Types.ObjectId(dto.organization);
		const target = new Types.ObjectId(dto.user);

		await this.validateIfCanManage(dto, request);

		const resultOrg = await this.securityService.updateRule(org, target, dto.role);
		if (!resultOrg) {
			throw new NotFoundException();
		}
		return { statusCode: 200 };
	}

	@Delete()
	async delete(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: DeleteSecurityRuleDto,
	): Promise<any> {
		const org = new Types.ObjectId(dto.organization);
		const target = new Types.ObjectId(dto.user);

		await this.validateIfCanManage(dto, request);

		const resultOrg = await this.securityService.deleteRule(org, target);
		if (!resultOrg) {
			throw new NotFoundException();
		}
		return { statusCode: 200 };
	}

	@Delete(':org/leave')
	async leave(
		@Req() request: Request,
		@Param('org', ParseObjectIdPipe, HasOrganizationAccessPipe) org: Types.ObjectId,
	): Promise<any> {
		const requester = new Types.ObjectId(request.user.id);
		const role = await this.securityService.getUserRole(org, requester);

		if (role == OrganizationSecurityRole.OWNER) {
			throw new BadRequestException(
				'You cannot leave an organization of which you are the owner. ' +
					'Please transfer the ownership or delete the organization.',
			);
		}

		await this.securityService.deleteRule(org, requester);

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

	@Get(':org/me')
	async getMeRule(
		@Req() request: Request,
		@Param('org', ParseObjectIdPipe, HasOrganizationAccessPipe) organization: Types.ObjectId,
	): Promise<SecurityRuleDto> {
		const requester = new Types.ObjectId(request.user.id);
		const role = await this.securityService.getUserRole(organization, requester);

		return { user: requester.toString(), role };
	}

	private async validateIfCanManage(
		dto: UpdateSecurityRuleDto | DeleteSecurityRuleDto,
		request: Request,
	) {
		const org = new Types.ObjectId(dto.organization);
		const requester = new Types.ObjectId(request.user.id);
		const target = new Types.ObjectId(dto.user);

		if (requester.equals(target)) {
			throw new BadRequestException('You cannot change your own security rules');
		}

		const targetRole = await this.securityService.getUserRole(org, target);
		const requesterRole = await this.securityService.getUserRole(org, requester);

		if (!requesterRole) {
			throw new BadRequestException('This user is not a part of this organization');
		}

		const canManageUser = SecurityUtils.canManageRole(requesterRole, targetRole);
		const canManageRole = SecurityUtils.canManageRole(
			requesterRole,
			(dto as any).role || OrganizationSecurityRole.MEMBER,
		);

		if (!canManageUser || !canManageRole) {
			throw new ForbiddenException('Your security role is not enough to manage this user');
		}
	}
}
