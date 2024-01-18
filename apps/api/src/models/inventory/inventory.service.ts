import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { CreateInventoryItemDto, PageDto, UpdateInventoryItemDto } from 'shared-types';
import { InventoryRepository } from './inventory.repository';
import { InventoryItemDocument } from './schemas/inventory-item.schema';
import PageQueryDto from '../../dto/page-query.dto';

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

	deleteManyByProduct(productId: Types.ObjectId) {
		return this.inventoryRepository.deleteMany({ product: productId });
	}

	deleteManyByWarehouse(warehouseId: Types.ObjectId) {
		return this.inventoryRepository.deleteMany({ warehouse: warehouseId });
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
}
