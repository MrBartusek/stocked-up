import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from 'shared-types';

@Controller('organizations')
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}

	@Post()
	create(@Body() createOrganizationDto: CreateOrganizationDto) {
		return this.organizationsService.create(createOrganizationDto);
	}
}
