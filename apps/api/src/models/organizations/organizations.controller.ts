import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from 'shared-types';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Request } from 'express';

@Controller('organizations')
@UseGuards(AuthenticatedGuard)
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}

	@Post()
	create(@Body() createOrganizationDto: CreateOrganizationDto) {
		return this.organizationsService.create(createOrganizationDto);
	}

	@Get()
	findAll(@Req() request: Request) {
		const userId = request.user.id;
		return this.organizationsService.findAllForUser(userId);
	}
}
