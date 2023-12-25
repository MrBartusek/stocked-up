import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { CreateOrganizationDto, UpdateOrganizationDto } from 'shared-types';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { OrganizationRepository } from './organizations.repository';
import { OrgSettingsDocument } from './schemas/org-settings';
import { OrganizationDocument } from './schemas/organization.schema';
import { InventoryService } from '../inventory/inventory.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrganizationsService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly warehousesService: WarehousesService,
		private readonly productsService: ProductsService,
	) {}

	async create(dto: CreateOrganizationDto): Promise<OrganizationDocument> {
		return this.organizationRepository.create({
			name: dto.name,
		});
	}

	async update(
		id: mongoose.Types.ObjectId,
		dto: UpdateOrganizationDto,
	): Promise<OrganizationDocument> {
		return this.organizationRepository.findOneByIdAndUpdate(id, { $set: dto });
	}

	async delete(id: mongoose.Types.ObjectId): Promise<OrganizationDocument> {
		const org = await this.findById(id);
		for await (const reference of org.warehouses) {
			await this.warehousesService.delete(reference.id as any);
		}
		const products = await this.productsService.findAll(org._id);
		for await (const product of products) {
			await this.productsService.delete(product._id);
		}
		return this.organizationRepository.deleteOneById(id);
	}

	async findAllForUser(id: mongoose.Types.ObjectId) {
		return this.organizationRepository.find({ 'acls.id': id });
	}

	async findById(id: mongoose.Types.ObjectId) {
		return this.organizationRepository.findById(id);
	}

	async exist(id: mongoose.Types.ObjectId) {
		return this.organizationRepository.exist({ _id: id });
	}

	async nameTaken(name: string) {
		return this.organizationRepository.exist({ name });
	}

	async findByWarehouse(
		warehouseId: mongoose.Types.ObjectId,
	): Promise<OrganizationDocument | null> {
		return this.organizationRepository.findOne({
			'warehouses.id': warehouseId,
		});
	}

	async addWarehouseReference(
		organizationId: mongoose.Types.ObjectId,
		warehouse: WarehouseDocument,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneByIdAndUpdate(organizationId, {
			$push: {
				warehouses: {
					id: warehouse._id,
					name: warehouse.name,
				},
			},
		});
	}

	async updateWarehouseReference(
		warehouse: WarehouseDocument,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneAndUpdate(
			{ 'warehouses.id': warehouse._id },
			{
				$set: {
					'warehouses.$.name': warehouse.name,
				},
			},
		);
	}

	async deleteWarehouseReference(
		warehouseId: mongoose.Types.ObjectId,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneAndUpdate(
			{ 'warehouses.id': warehouseId },
			{
				$pull: {
					warehouses: { id: warehouseId },
				},
			},
		);
	}

	async findAllWarehouses(orgId: mongoose.Types.ObjectId | string): Promise<WarehouseDocument[]> {
		const id = new mongoose.Types.ObjectId(orgId);
		return this.organizationRepository.findAllWarehouses(id);
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

	async updateSettings(
		id: mongoose.Types.ObjectId | string,
		settings: FilterQuery<OrgSettingsDocument>,
	) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ $set: { settings: settings } },
		);
	}
}
