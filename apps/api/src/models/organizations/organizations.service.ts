import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { CreateOrganizationDto, UpdateOrganizationDto } from 'shared-types';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { OrganizationRepository } from './organizations.repository';
import { OrgSettingsDocument } from './schemas/org-settings';
import { OrganizationDocument } from './schemas/organization.schema';

@Injectable()
export class OrganizationsService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

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
		warehouse: WarehouseDocument,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneAndUpdate(
			{ 'warehouses.id': warehouse._id },
			{
				$pull: {
					warehouses: warehouse._id,
				},
			},
		);
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

	async calculateTotalValue(orgId: mongoose.Types.ObjectId): Promise<number> {
		const result = await this.organizationRepository.aggregate([
			{
				$match: {
					_id: orgId,
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
			{
				$unwind: '$warehouseDetails',
			},
			{
				$group: {
					_id: null,
					totalValue: { $sum: '$warehouseDetails.totalValue' },
				},
			},
		]);
		return result[0].totalValue;
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
