import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InventoryCreatedEvent } from '../../inventory/events/inventory-created.event';
import { InventoryDeletedEvent } from '../../inventory/events/inventory-deleted.event';
import { InventoryUpdatedEvent } from '../../inventory/events/inventory-updated.event';
import { WarehouseStatsService } from '../warehouse-stats.service';

type InventoryEvent = InventoryCreatedEvent | InventoryUpdatedEvent | InventoryDeletedEvent;

@Injectable()
export class InventoryEventListener {
	constructor(private readonly warehouseStatsService: WarehouseStatsService) {}

	@OnEvent('inventory.*', { async: true, suppressErrors: false })
	async handleInventoryEvent(event: InventoryEvent) {
		const warehouse = event.payload.warehouse;
		await this.warehouseStatsService.recalculateTotalValue(warehouse);
	}
}
