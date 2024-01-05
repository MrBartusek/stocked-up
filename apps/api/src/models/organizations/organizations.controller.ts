import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import {
	CreateOrganizationDto,
	OrganizationDto,
	PatchOrganizationSettingsDto,
	UpdateOrganizationDto,
	WarehouseDto,
} from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { Warehouse } from '../warehouses/schemas/warehouse.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsService } from './organizations.service';
import { OrgSettings } from './schemas/org-settings';
import { Organization } from './schemas/organization.schema';

@Controller('organizations')
@UseGuards(AuthenticatedGuard)
export class OrganizationsController {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsStatsService: OrganizationsStatsService,
		private readonly warehousesService: WarehousesService,
	) {}

	@Post()
	async create(
		@Body(new ValidationPipe()) createOrganizationDto: CreateOrganizationDto,
		@Req() request: Request,
	): Promise<OrganizationDto> {
		const nameTaken = await this.organizationsService.nameTaken(createOrganizationDto.name);
		if (nameTaken) {
			throw new BadRequestException('This organization name is already taken');
		}

		const org = await this.organizationsService.create(createOrganizationDto);
		const warehouse = await this.warehousesService.create(createOrganizationDto.warehouse);

		await this.organizationsService.updateAcl(org.id, request.user.id, 'owner');
		const updatedOrg = await this.organizationsService.addWarehouseReference(org._id, warehouse);

		return Organization.toDto(updatedOrg);
	}

	@Get()
	async list(@Req() request: Request): Promise<OrganizationDto[]> {
		const userId = new Types.ObjectId(request.user.id);
		const orgs = await this.organizationsService.findAllForUser(userId);
		return orgs.map((org) => Organization.toDto(org));
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(new ValidationPipe()) dto: UpdateOrganizationDto,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.update(id, dto);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<OrganizationDto> {
		const org = await this.organizationsService.delete(id);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Get(':id')
	async findById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<OrganizationDto> {
		const org = await this.organizationsService.findById(id);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Get(':id/warehouses')
	async findWarehouses(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
	): Promise<WarehouseDto[]> {
		const warehouses = await this.organizationsService.findAllWarehouses(id);
		return warehouses.map((w) => Warehouse.toDto(w));
	}

	@Patch(':id/settings')
	async updateSettings(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(new ValidationPipe()) patchOrganizationSettingsDto: PatchOrganizationSettingsDto,
	): Promise<OrgSettings> {
		const org = await this.organizationsService.updateSettings(id, patchOrganizationSettingsDto);
		if (!org) {
			throw new NotFoundException();
		}

		await this.organizationsStatsService.recalculateTotalValue(id);
		return org.settings;
	}
}
