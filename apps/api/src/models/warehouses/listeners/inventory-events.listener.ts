import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InventoryCreatedEvent } from '../../inventory/events/inventory-created.event';
import { WarehousesService } from '../warehouses.service';
import { InventoryUpdatedEvent } from '../../inventory/events/inventory-updated.event';
import { InventoryDeletedEvent } from '../../inventory/events/inventory-deleted.event';

type InventoryEvent = InventoryCreatedEvent | InventoryUpdatedEvent | InventoryDeletedEvent;

@Injectable()
export class InventoryEventListener {
	constructor(private readonly warehousesService: WarehousesService) {}

	@OnEvent('inventory.*', { async: true })
	async handleInventoryEvent(event: InventoryEvent) {
		const warehouse = event.payload.warehouse;
		await this.warehousesService.recalculateTotalValue(warehouse);
	}
}
