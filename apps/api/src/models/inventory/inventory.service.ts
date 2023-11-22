import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { AddInventoryItemDto } from 'shared-types';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	create(addInventoryItemDto: AddInventoryItemDto) {
		const { warehouseId, productId, ...rest } = addInventoryItemDto;
		return this.inventoryRepository.create({
			warehouse: warehouseId as any,
			product: productId as any,
			...rest,
		});
	}

	async findOne(id: Types.ObjectId): Promise<InventoryItemDocument | null> {
		const result = await this.aggregateWithProduct({ _id: id });

		if (result.length > 0) {
			return result[0];
		}
	}

	async findByProduct(
		warehouseId: Types.ObjectId,
		productId: Types.ObjectId,
	): Promise<InventoryItemDocument | null> {
		const result = await this.aggregateWithProduct({
			warehouse: warehouseId,
			product: productId,
		});

		if (result.length > 0) {
			return result[0];
		}
	}

	findAll(warehouseId: Types.ObjectId): Promise<InventoryItemDocument[]> {
		return this.aggregateWithProduct({ warehouse: warehouseId });
	}

	aggregateWithProduct(match: FilterQuery<any>) {
		return this.inventoryRepository.aggregate([
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
}
