import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { WarehouseStatsService } from '../warehouses/warehouses-stats.service';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryStatsService {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	async getTotalWarehouseInventoryValue(
		warehouseId: mongoose.Types.ObjectId,
		strategy: OrgValueCalculationStrategy,
	) {
		return this.inventoryRepository.calculateTotalWarehouseValue(warehouseId, strategy);
	}
}
