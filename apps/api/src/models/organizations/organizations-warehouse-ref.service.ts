import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationDocument } from './schemas/organization.schema';

export interface WarehouseReferenceData {
	id: Types.ObjectId;
	name: string;
}

@Injectable()
export class OrganizationsWarehouseRefService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

	async addRef(
		organization: Types.ObjectId,
		ref: WarehouseReferenceData,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneByIdAndUpdate(organization, {
			$push: {
				warehouses: ref,
			},
		});
	}

	async updateRef(
		organization: Types.ObjectId,
		ref: WarehouseReferenceData,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: organization, 'warehouses.id': ref.id },
			{
				$set: {
					'warehouses.$.name': ref.name,
				},
			},
		);
	}

	async deleteRef(
		organization: Types.ObjectId,
		warehouse: Types.ObjectId,
	): Promise<OrganizationDocument | undefined> {
		return this.organizationRepository.findOneByIdAndUpdate(organization, {
			$pull: {
				warehouses: { id: warehouse },
			},
		});
	}
}
