import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organizations.repository';

@Injectable()
export class OrganizationsStatsService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}
}
