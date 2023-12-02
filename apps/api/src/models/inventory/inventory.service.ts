import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { CreateInventoryItemDto, UpdateInventoryItemDto } from 'shared-types';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	create(dto: CreateInventoryItemDto) {
		const { warehouseId, productId, ...rest } = dto;
		return this.inventoryRepository.create({
			warehouse: warehouseId as any,
			product: productId as any,
			...rest,
		});
	}

	update(id: Types.ObjectId, dto: UpdateInventoryItemDto) {
		return this.inventoryRepository.findOneAndUpdate(id, { $set: dto });
	}

	delete(id: Types.ObjectId) {
		return this.inventoryRepository.deleteOneById(id);
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

	find(query: FilterQuery<any>): Promise<InventoryItemDocument[]> {
		return this.aggregateWithProduct(query);
	}

	findAllInWarehouse(warehouseId: Types.ObjectId): Promise<InventoryItemDocument[]> {
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

	async calculateTotalValue(
		warehouseId: Types.ObjectId,
		strategy: OrgValueCalculationStrategy,
	): Promise<number> {
		const result = await this.inventoryRepository.aggregate([
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
		return result[0].totalValue;
	}
}
