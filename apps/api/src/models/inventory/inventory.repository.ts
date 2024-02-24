import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { PageQueryDto } from '../../dto/page-query.dto';
import { InventoryItem, InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryRepository extends EntityRepository<InventoryItemDocument> {
	constructor(@InjectModel(InventoryItem.name) userModel: Model<InventoryItemDocument>) {
		super(userModel);
	}

	findAndAggregateWithProduct(match: FilterQuery<any>) {
		return this.aggregate(this.getAggregateQuery(match));
	}

	aggregateWithProductAndPaginate(match: FilterQuery<any>, pageQueryDto: PageQueryDto) {
		return this.paginate(this.getAggregateQuery(match), pageQueryDto);
	}

	private getAggregateQuery(match: FilterQuery<any>): mongoose.PipelineStage[] {
		return [
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
		];
	}
}
