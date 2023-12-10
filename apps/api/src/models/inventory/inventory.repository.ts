import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { InventoryItem, InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryRepository extends EntityRepository<InventoryItemDocument> {
	constructor(@InjectModel(InventoryItem.name) userModel: Model<InventoryItemDocument>) {
		super(userModel);
	}

	findAndAggregateWithProduct(match: FilterQuery<any>) {
		return this.aggregate([
			{
				$match: match,
			},
			{
				$lookup: {
					from: 'products',
					localField: 'product',
					foreignField: '_id',
					as: 'product',
				},
			},
			{
				$unwind: '$product',
			},
		]);
	}

	async calculateTotalWarehouseValue(
		warehouseId: Types.ObjectId,
		strategy: OrgValueCalculationStrategy,
	): Promise<number> {
		const result = await this.aggregate([
			{
				$match: { warehouse: warehouseId },
			},
			{
				$lookup: {
					from: 'products',
					localField: 'product',
					foreignField: '_id',
					as: 'product',
				},
			},
			{
				$unwind: '$product',
			},
			{
				$group: {
					_id: null,
					totalValue: { $sum: { $multiply: [`$product.${strategy}`, '$quantity'] } },
				},
			},
		]);

		if (result.length == 0) {
			return 0;
		}

		return result[0].totalValue;
	}
}
