import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseDeletedEvent } from '../../warehouses/events/warehouse-deleted.event';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';

@Injectable()
export class WarehouseDeletedListener {
	constructor(private readonly refService: OrganizationsWarehouseRefService) {}

	@OnEvent('warehouse.deleted', { async: true })
	async handleWarehouseDelete(event: WarehouseDeletedEvent) {
		const org = event.payload.organization;
		await this.refService.deleteRef(org, event.id);
	}
}
