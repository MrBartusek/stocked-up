import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	async findOne(id: Types.ObjectId): Promise<InventoryItemDocument | null> {
		const result = await this.inventoryRepository.aggregate([
			{
				$match: {
					_id: id,
				},
			},
			{
				$limit: 1,
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

		if (result.length > 0) {
			return result[0];
		}
	}

	async findByProduct(
		warehouseId: Types.ObjectId,
		productId: Types.ObjectId,
	): Promise<InventoryItemDocument> {
		const i = await this.inventoryRepository.findOne();
		console.log(i, productId, warehouseId);
		return this.inventoryRepository.findOne({
			warehouse: warehouseId,
			product: productId,
		});
	}

	findAll(warehouseId: Types.ObjectId): Promise<InventoryItemDocument[]> {
		return this.inventoryRepository.aggregate([
			{
				$match: {
					warehouse: warehouseId,
				},
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
