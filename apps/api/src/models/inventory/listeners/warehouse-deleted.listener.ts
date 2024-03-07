import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseDeletedEvent } from '../../warehouses/events/warehouse-deleted.event';
import { InventoryService } from '../inventory.service';

@Injectable()
export class WarehouseDeletedListener {
	constructor(private readonly inventoryService: InventoryService) {}

	@OnEvent('warehouse.deleted', { async: true, suppressErrors: false })
	async handleWarehouseDelete(event: WarehouseDeletedEvent) {
		await this.inventoryService.deleteManyByWarehouse(event.id);
	}
}
