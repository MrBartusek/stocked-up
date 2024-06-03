import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import {
	GenericResponseDto,
	OrganizationDto,
	OrganizationSecurityRole,
	PageDto,
} from 'shared-types';
import { setTimeout } from 'timers/promises';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasOwnerAccessPipe } from '../../security/pipes/has-owner-access.pipe';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PatchOrganizationSettingsDto } from './dto/path-organization-settings.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationsService } from './organizations.service';
import { OrgSettings } from './schemas/org-settings';
import { Organization } from './schemas/organization.schema';
import { HasAdminAccessPipe } from '../../security/pipes/has-admin-access.pipe';

@ApiTags('organizations')
@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsAclService: OrganizationsAclService,
		private readonly warehousesService: WarehousesService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create new organization' })
	async create(
		@Body() createOrganizationDto: CreateOrganizationDto,
		@Req() request: Request,
	): Promise<OrganizationDto> {
		const user = new Types.ObjectId(request.user.id);

		const org = await this.organizationsService.create(createOrganizationDto);
		const warehouse = await this.warehousesService.create(org._id, createOrganizationDto.warehouse);

		await this.awaitWarehouseSetup(warehouse);

		const updatedOrg = await this.organizationsAclService.addRule(org.id, {
			user,
			role: OrganizationSecurityRole.OWNER,
		});

		return Organization.toDto(updatedOrg);
	}

	@Get()
	@ApiOperation({ summary: 'List organizations that authenticated user has access to' })
	async list(
		@Req() request: Request,
		@Query(
			new PageQueryValidationPipe<OrganizationDto>({
				disableOrderBy: true,
				disableTextSearch: true,
			}),
		)
		pageQuery: PageQueryDto<OrganizationDto>,
	): Promise<PageDto<OrganizationDto>> {
		const userId = new Types.ObjectId(request.user.id);
		const { items, meta } = await this.organizationsService.paginateAllForUser(userId, pageQuery);

		const orgDTOs = items.map((org) => Organization.toDto(org));
		return {
			meta,
			items: orgDTOs,
		};
	}

	@Get('owner-check')
	@ApiOperation({
		summary: 'Check if authenticated user is owner of any organization',
		description: 'This is mostly an internal check called when deleting user account',
	})
	async ownerCheck(@Req() request: Request): Promise<GenericResponseDto> {
		const userId = new Types.ObjectId(request.user.id);
		const response = await this.organizationsService.isUserOwnerOfAny(userId);
		return { response };
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a organization by id' })
	async update(
		@Param('id', ParseObjectIdPipe, HasAdminAccessPipe) id: Types.ObjectId,
		@Body() dto: UpdateOrganizationDto,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.update(id, dto);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a organization by id' })
	async delete(
		@Param('id', ParseObjectIdPipe, HasOwnerAccessPipe) id: Types.ObjectId,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.delete(id);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a organization by id' })
	async findById(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) id: Types.ObjectId,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.findById(id);
		return Organization.toDto(org);
	}

	@Patch(':id/settings')
	@ApiOperation({ summary: 'Update organization settings by id' })
	async updateSettings(
		@Param('id', ParseObjectIdPipe, HasAdminAccessPipe) id: Types.ObjectId,
		@Body() patchOrganizationSettingsDto: PatchOrganizationSettingsDto,
	): Promise<OrgSettings> {
		const org = await this.organizationsService.updateSettings(id, patchOrganizationSettingsDto);

		if (!org) {
			throw new NotFoundException();
		}

		return org.settings;
	}

	/**
	 * Waits for warehouse to be added as organization ref.
	 * This function will timeout after 10 seconds.
	 */
	private async awaitWarehouseSetup(warehouse: WarehouseDocument) {
		const MAX_WAIT_TIME = 10_000;
		let totalWaitTime = 0;

		while (MAX_WAIT_TIME > totalWaitTime) {
			const organization = await this.organizationsService.findById(warehouse.organization);
			const hasRef = organization.warehouses.find((w) => w.id.equals(warehouse._id));

			if (hasRef) break;

			totalWaitTime += 500;
			await setTimeout(500);
		}

		if (MAX_WAIT_TIME <= totalWaitTime) {
			throw new Error(`Awaiting warehouse setup timeout, after ${MAX_WAIT_TIME / 1000}s`);
		}
	}
}
