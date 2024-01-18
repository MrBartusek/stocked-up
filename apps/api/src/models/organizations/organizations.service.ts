import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { FilterQuery } from 'mongoose';
import { CreateOrganizationDto, UpdateOrganizationDto } from 'shared-types';
import { ProductsService } from '../products/products.service';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationRepository } from './organizations.repository';
import { OrgSettingsDocument } from './schemas/org-settings';
import { OrganizationDocument } from './schemas/organization.schema';
import PageQueryDto from '../../dto/page-query-dto';

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
		await this.productsService.deleteAllByOrg(org._id);
		return this.organizationRepository.deleteOneById(id);
	}

	async listAllForUser(id: mongoose.Types.ObjectId, pageQueryDto: PageQueryDto) {
		return this.organizationRepository.paginate({ 'acls.id': id }, pageQueryDto);
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

	async updateAcl(
		organizationId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId,
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
