import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilterQuery, Types } from 'mongoose';
import { PageDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { InventoryCreatedEvent } from './events/inventory-created.event';
import { InventoryDeletedEvent } from './events/inventory-deleted.event';
import { InventoryUpdatedEvent } from './events/inventory-updated.event';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly inventoryRepository: InventoryRepository,
	) {}

	async create(dto: CreateInventoryItemDto) {
		const { organizationId, warehouseId, productId, ...rest } = dto;

		const item = await this.inventoryRepository.create({
			organization: new Types.ObjectId(organizationId),
			warehouse: new Types.ObjectId(warehouseId),
			product: new Types.ObjectId(productId),
			...rest,
		});

		const event = new InventoryCreatedEvent(item);
		this.eventEmitter.emit('inventory.created', event);

		return item;
	}

	async update(
		id: Types.ObjectId,
		dto: UpdateInventoryItemDto,
	): Promise<InventoryItemDocument | null> {
		const item = await this.inventoryRepository.findOneAndUpdate(id, { $set: dto });

		if (!item) return null;

		const event = new InventoryUpdatedEvent(item);
		this.eventEmitter.emit('inventory.updated', event);

		return item;
	}

	async delete(id: Types.ObjectId): Promise<InventoryItemDocument | null> {
		const item = await this.inventoryRepository.deleteOneById(id);

		if (!item) return null;

		const event = new InventoryDeletedEvent(item);
		this.eventEmitter.emit('inventory.deleted', event);

		return item;
	}

	async deleteManyByProduct(productId: Types.ObjectId): Promise<number> {
		const itemsList = await this.inventoryRepository.find({ product: productId });
		for await (const item of itemsList) {
			await this.delete(item._id);
		}
		return itemsList.length;
	}

	async deleteManyByWarehouse(warehouseId: Types.ObjectId): Promise<number> {
		const itemsList = await this.inventoryRepository.find({ warehouse: warehouseId });
		for await (const item of itemsList) {
			await this.delete(item._id);
		}
		return itemsList.length;
	}

	async findOne(id: Types.ObjectId): Promise<InventoryItemDocument | null> {
		const result = await this.inventoryRepository.findAndAggregateWithProduct({ _id: id });

		if (result.length > 0) {
			return result[0];
		}
	}

	async findByProduct(
		warehouseId: Types.ObjectId,
		productId: Types.ObjectId,
	): Promise<InventoryItemDocument | null> {
		const result = await this.inventoryRepository.findAndAggregateWithProduct({
			warehouse: warehouseId,
			product: productId,
		});

		if (result.length > 0) {
			return result[0];
		}
	}

	find(
		query: FilterQuery<any>,
		pageQueryDto: PageQueryDto,
	): Promise<PageDto<InventoryItemDocument>> {
		return this.inventoryRepository.aggregateWithProductAndPaginate(query, pageQueryDto);
	}

	listByWarehouse(
		warehouseId: Types.ObjectId,
		pageQueryDto: PageQueryDto,
	): Promise<PageDto<InventoryItemDocument>> {
		return this.inventoryRepository.aggregateWithProductAndPaginate(
			{ warehouse: warehouseId },
			pageQueryDto,
		);
	}

	/**
	 * Calculates total value of all inventory items with specified
	 * warehouse id by multiplying quality and buyPrice or sellPrice
	 * of each item (depending on strategy)
	 *
	 * @param warehouseId Warehouse to check value of
	 * @param strategy strategy to use
	 * @returns total value in organization's currency
	 */
	async calculateStockValue(
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

		if (result.length == 0) {
			return 0;
		}

		return result[0].totalValue;
	}

	/**
	 * Calculates total quantity of all inventory items with specified
	 * warehouse id by.
	 *
	 * @param warehouseId Warehouse to check quantity for
	 * @returns total quantity
	 */
	async calculateTotalQuantity(warehouseId: Types.ObjectId): Promise<number> {
		const result = await this.inventoryRepository.aggregate([
			{
				$match: { warehouse: warehouseId },
			},
			{
				$group: {
					_id: null,
					totalQuantity: { $sum: '$quantity' },
				},
			},
		]);

		if (result.length == 0) {
			return 0;
		}

		return result[0].totalQuantity;
	}
}
