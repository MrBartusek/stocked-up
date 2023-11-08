import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateOrganizationDto, OrganizationDto } from 'shared-types';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { OrganizationsService } from './organizations.service';
import { OrganizationDocument } from './schemas/organization.schema';
import { NotFoundError } from 'rxjs';

@Controller('organizations')
@UseGuards(AuthenticatedGuard)
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}

	@Post()
	async create(
		@Body() createOrganizationDto: CreateOrganizationDto,
		@Req() request: Request,
	): Promise<OrganizationDto> {
		const org = await this.organizationsService.create(createOrganizationDto);
		await this.organizationsService.updateAcl(org.id, request.user.id, 'owner');
		return this.castOrganizationToDto(org);
	}

	@Get()
	async findAll(@Req() request: Request): Promise<OrganizationDto[]> {
		const userId = request.user.id;
		const orgs = await this.organizationsService.findAllForUser(userId);
		return orgs.map((org) => this.castOrganizationToDto(org));
	}

	@Get(':id')
	async findByID(@Param('id') id: string): Promise<OrganizationDto> {
		const org = await this.organizationsService.findById(id);
		if (!org) {
			throw new NotFoundException();
		}
		return this.castOrganizationToDto(org);
	}

	private castOrganizationToDto(org: OrganizationDocument): OrganizationDto {
		return {
			id: org._id,
			name: org.name,
			currency: org.currency,
			totalValue: org.totalValue,
			warehouses: org.warehouses,
		};
	}
}
