import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto, CreateWarehouseDto } from 'shared-types';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationDocument } from './schemas/organization.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { Warehouse } from '../warehouses/schemas/warehouse.schema';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly warehouseService: WarehousesService,
	) {}

	async create(createOrganizationDto: CreateOrganizationDto): Promise<OrganizationDocument> {
		const organization = await this.organizationRepository.create({
			name: createOrganizationDto.name,
		});

		await this.addWarehouse(organization, createOrganizationDto.warehouse);

		return this.organizationRepository.findById(organization._id);
	}

	async addWarehouse(
		organization: OrganizationDocument,
		createWarehouseDto: CreateWarehouseDto,
	): Promise<Warehouse> {
		const warehouse = await this.warehouseService.create(createWarehouseDto);

		await this.organizationRepository.findOneByIdAndUpdate(organization._id, {
			$push: {
				warehouses: {
					name: warehouse.name,
					id: warehouse._id,
				},
			},
		});

		return warehouse;
	}
}
