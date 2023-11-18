import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	async findOne(
		warehouseId: Types.ObjectId,
		productId: Types.ObjectId,
	): Promise<InventoryItemDocument | null> {
		const result = await this.inventoryRepository.aggregate([
			{
				$match: {
					warehouse: warehouseId,
					product: productId,
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
