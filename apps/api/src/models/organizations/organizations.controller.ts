import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import {
	CreateOrganizationDto,
	CreateWarehouseInOrgDto,
	OrganizationDto,
	PatchOrganizationSettingsDto,
	WarehouseDto,
} from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { Warehouse } from '../warehouses/schemas/warehouse.schema';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schemas/organization.schema';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { Types } from 'mongoose';

@Controller('organizations')
@UseGuards(AuthenticatedGuard)
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}

	@Post()
	async create(
		@Body(new ValidationPipe()) createOrganizationDto: CreateOrganizationDto,
		@Req() request: Request,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.create(createOrganizationDto);
		await this.organizationsService.updateAcl(org.id, request.user.id, 'owner');
		return Organization.toDto(org);
	}

	@Post('warehouses')
	async createWarehouse(
		@Body(new ValidationPipe()) dto: CreateWarehouseInOrgDto,
	): Promise<WarehouseDto> {
		const exist = await this.organizationsService.exist(dto.organizationId);
		if (!exist) {
			throw new NotFoundException('Organization with provided id was not found');
		}

		const warehouse = await this.organizationsService.addWarehouse(
			dto.organizationId,
			dto.warehouse,
		);
		return Warehouse.toDto(warehouse);
	}

	@Get()
	async findAll(@Req() request: Request): Promise<OrganizationDto[]> {
		const userId = request.user.id;
		const orgs = await this.organizationsService.findAllForUser(userId);
		return orgs.map((org) => Organization.toDto(org));
	}

	@Get(':id')
	async findByID(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<OrganizationDto> {
		const org = await this.organizationsService.findById(id);
		if (!org) {
			throw new NotFoundException();
		}
		return Organization.toDto(org);
	}

	@Get(':id/warehouses')
	async findWarehouses(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<any> {
		const warehouses = await this.organizationsService.findAllWarehouses(id);
		return warehouses.map((w) => Warehouse.toDto(w));
	}

	@Patch(':id/settings')
	async updateSettings(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(new ValidationPipe()) patchOrganizationSettingsDto: PatchOrganizationSettingsDto,
	): Promise<any> {
		const orgExist = await this.organizationsService.exist(id);
		if (!orgExist) {
			throw new NotFoundException();
		}

		await this.organizationsService.updateSettings(id, patchOrganizationSettingsDto);
		return { message: 'ok', statusCode: 200 };
	}
}
