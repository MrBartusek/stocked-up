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
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { OrganizationDto, OrganizationSecurityRole, PageDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { WarehousesService } from '../warehouses/warehouses.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PatchOrganizationSettingsDto } from './dto/path-organization-settings.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationsService } from './organizations.service';
import { OrgSettings } from './schemas/org-settings';
import { Organization } from './schemas/organization.schema';

@ApiTags('organizations')
@Controller('organizations')
@UseGuards(AuthenticatedGuard)
export class OrganizationsController {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsAclService: OrganizationsAclService,
		private readonly warehousesService: WarehousesService,
	) {}

	@Post()
	async create(
		@Body() createOrganizationDto: CreateOrganizationDto,
		@Req() request: Request,
	): Promise<OrganizationDto> {
		const user = new Types.ObjectId(request.user.id);

		const org = await this.organizationsService.create(createOrganizationDto);
		const warehouse = await this.warehousesService.create(org._id, createOrganizationDto.warehouse);

		await this.organizationsAclService.addRule(org.id, {
			user,
			role: OrganizationSecurityRole.OWNER,
		});
		const updatedOrg = await this.organizationsService.addWarehouseReference(org._id, warehouse);

		return Organization.toDto(updatedOrg);
	}

	@Get()
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
		const { items, meta } = await this.organizationsService.listAllForUser(userId, pageQuery);

		const orgDTOs = items.map((org) => Organization.toDto(org));
		return {
			meta,
			items: orgDTOs,
		};
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) id: Types.ObjectId,
		@Body() dto: UpdateOrganizationDto,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.update(id, dto);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Delete(':id')
	async delete(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) id: Types.ObjectId,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.delete(id);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Get(':id')
	async findById(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) id: Types.ObjectId,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.findById(id);
		return Organization.toDto(org);
	}

	@Patch(':id/settings')
	async updateSettings(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) id: Types.ObjectId,
		@Body() patchOrganizationSettingsDto: PatchOrganizationSettingsDto,
	): Promise<OrgSettings> {
		const org = await this.organizationsService.updateSettings(id, patchOrganizationSettingsDto);

		if (!org) {
			throw new NotFoundException();
		}

		return org.settings;
	}
}
