import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { Organization, OrganizationDocument } from './schemas/organization.schema';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { Types } from 'mongoose';

@Injectable()
export class OrganizationRepository extends EntityRepository<OrganizationDocument> {
	constructor(@InjectModel(Organization.name) userModel: Model<OrganizationDocument>) {
		super(userModel);
	}

	async findAllWarehouses(orgId: Types.ObjectId): Promise<WarehouseDocument[]> {
		const result = await this.aggregate([
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
		]);
		return result.map((r) => r.warehouseDetails[0]);
	}
}
