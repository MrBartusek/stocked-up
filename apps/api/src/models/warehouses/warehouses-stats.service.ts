import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InventoryStatsService } from '../inventory/inventory-stats.service';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehouseStatsService {
	constructor(
		private readonly warehouseRepository: WarehouseRepository,
		private readonly inventoryStatsService: InventoryStatsService,
	) {}

	private readonly logger = new Logger(WarehouseStatsService.name);

	async recalculateWarehouseValue(
		warehouseId: mongoose.Types.ObjectId,
		strategy: OrgValueCalculationStrategy,
	) {
		const value = await this.inventoryStatsService.getTotalWarehouseInventoryValue(
			warehouseId,
			strategy,
		);
		await this.warehouseRepository.findOneByIdAndUpdate(warehouseId, { totalValue: value });
		this.logger.log(`Calculated warehouse value $${value} for warehouse ${warehouseId}`);
		return value;
	}
}
