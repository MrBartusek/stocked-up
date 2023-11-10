import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto, CreateWarehouseDto } from 'shared-types';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationDocument } from './schemas/organization.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { Warehouse, WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import * as mongoose from 'mongoose';

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

		await this.addWarehouse(organization._id, createOrganizationDto.warehouse);

		return this.organizationRepository.findById(organization._id);
	}

	async addWarehouse(
		organizationId: mongoose.Types.ObjectId | string,
		createWarehouseDto: CreateWarehouseDto,
	): Promise<WarehouseDocument> {
		const warehouse = await this.warehouseService.create(createWarehouseDto);

		await this.organizationRepository.findOneByIdAndUpdate(organizationId, {
			$push: {
				warehouses: {
					name: warehouse.name,
					id: warehouse._id,
				},
			},
		});

		return warehouse;
	}

	async findAllWarehouses(orgId: mongoose.Types.ObjectId | string): Promise<WarehouseDocument[]> {
		const id = new mongoose.Types.ObjectId(orgId);
		const result = await this.organizationRepository.aggregate([
			{
				$match: {
					_id: id,
				},
			},
			{
				$unwind: '$warehouses',
			},
			{
				$lookup: {
					from: 'warehouses',
					localField: 'warehouses.id',
					foreignField: '_id',
					as: 'warehouseDetails',
				},
			},
		]);
		return result.map((r) => r.warehouseDetails[0]);
	}

	async updateAcl(
		organizationId: mongoose.Types.ObjectId | string,
		userId: mongoose.Types.ObjectId | string,
		role: string | null,
	): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organizationId },
			{
				$push: {
					acls: {
						id: userId,
						role,
					},
				},
			},
		);
	}

	async findAllForUser(id: mongoose.Types.ObjectId | string) {
		return this.organizationRepository.find({ 'acls.id': id });
	}

	async findById(id: mongoose.Types.ObjectId | string) {
		return this.organizationRepository.findById(id);
	}

	async exist(id: mongoose.Types.ObjectId | string) {
		return this.organizationRepository.exist({ _id: id });
	}
}
