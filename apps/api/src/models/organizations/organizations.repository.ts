import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { PageDto, PageQueryDto } from 'shared-types';
import { EntityRepository } from '../../database/entity.repository';
import { WarehouseDocument } from '../warehouses/schemas/warehouse.schema';
import { Organization, OrganizationDocument } from './schemas/organization.schema';

@Injectable()
export class OrganizationRepository extends EntityRepository<OrganizationDocument> {
	constructor(@InjectModel(Organization.name) userModel: Model<OrganizationDocument>) {
		super(userModel);
	}

	getWarehousesAggregateQuery(orgId: Types.ObjectId): PipelineStage[] {
		return [
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
		];
	}

	async paginateAllWarehouses(
		orgId: Types.ObjectId,
		pageQueryDto: PageQueryDto<WarehouseDocument>,
	): Promise<PageDto<WarehouseDocument>> {
		const result = await this.paginate(this.getWarehousesAggregateQuery(orgId), pageQueryDto);
		return { ...result, items: result.items.map((r: any) => r.warehouseDetails[0]) };
	}

	async findAllWarehouses(orgId: Types.ObjectId): Promise<WarehouseDocument[]> {
		const result = await this.aggregate(this.getWarehousesAggregateQuery(orgId));
		return result.map((r: any) => r.warehouseDetails[0]);
	}
}
