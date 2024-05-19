import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { OrganizationSecurityRole, PageDto, SecurityRuleDto } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { ConfirmedGuard } from '../models/users/guards/confirmed.guard';
import { UsersService } from '../models/users/users.service';
import { PageQueryValidationPipe } from '../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { DeleteSecurityRuleDto } from './dto/delete-security-rule.dto';
import { UpdateSecurityRuleDto } from './dto/update-security-rule.dto';
import { SecurityUtils } from './helpers/security.utils';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { SecurityValidationPipe } from './pipes/security-validation.pipe';
import { SecurityService } from './security.service';
import { HasOwnerAccessPipe } from './pipes/has-owner-access.pipe';
import { TransferOrganizationDto } from './dto/transfer-organization.dto';

@Controller('security')
@ApiTags('security')
export class SecurityController {
	constructor(
		private readonly securityService: SecurityService,
		private readonly usersService: UsersService,
	) {}

	@Post()
	@UseGuards(ConfirmedGuard)
	@ApiOperation({ summary: 'Create new security rule' })
	@HttpCode(201)
	async create(@Body(SecurityValidationPipe) dto: CreateSecurityRuleDto): Promise<any> {
		const org = new Types.ObjectId(dto.organization);

		const user = await this.usersService.findOne(dto.email);
		if (!user) {
			throw new NotFoundException('This user does not exist');
		}

		await this.securityService.addRule(org, user._id);
		return { statusCode: 201 };
	}

	@Put()
	@ApiOperation({ summary: 'Update a security rule by id' })
	@HttpCode(200)
	async update(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: UpdateSecurityRuleDto,
	): Promise<any> {
		const org = new Types.ObjectId(dto.organization);
		const target = new Types.ObjectId(dto.user);

		await this.validateIfCanManage(dto, request);

		await this.securityService.updateRule(org, target, dto.role);
		return { statusCode: 200 };
	}

	@Delete()
	@ApiOperation({ summary: 'Delete a security rule by id' })
	@HttpCode(200)
	async delete(
		@Req() request: Request,
		@Body(SecurityValidationPipe) dto: DeleteSecurityRuleDto,
	): Promise<any> {
		const org = new Types.ObjectId(dto.organization);
		const target = new Types.ObjectId(dto.user);

		await this.validateIfCanManage(dto, request);

		await this.securityService.deleteRule(org, target);
		return { statusCode: 200 };
	}

	@Delete(':org/leave')
	@ApiOperation({ summary: 'Leave organization by id' })
	@HttpCode(200)
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

	@Post(':org/transfer')
	@ApiOperation({ summary: 'Transfer organization ownership to another user' })
	@HttpCode(200)
	async transfer(
		@Param('org', ParseObjectIdPipe, HasOwnerAccessPipe) org: Types.ObjectId,
		@Body() body: TransferOrganizationDto,
	): Promise<any> {
		const to = new Types.ObjectId(body.user);
		await this.securityService.transferOwnership(org, to);
		return { statusCode: 200 };
	}

	@Get(':id')
	@ApiOperation({ summary: 'List organization security rules' })
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
	@ApiOperation({ summary: 'Get security rule of authenticated user' })
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
