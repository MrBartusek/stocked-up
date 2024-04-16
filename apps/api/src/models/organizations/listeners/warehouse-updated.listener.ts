import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseUpdatedEvent } from '../../warehouses/events/warehouse-updated.event';
import {
	OrganizationsWarehouseRefService,
	WarehouseReferenceData,
} from '../organizations-warehouse-ref.service';

@Injectable()
export class WarehouseUpdatedListener {
	constructor(private readonly refService: OrganizationsWarehouseRefService) {}

	@OnEvent('warehouse.updated', { async: true, suppressErrors: false })
	async handleWarehouseUpdate(event: WarehouseUpdatedEvent) {
		const org = event.payload.organization;
		const data: WarehouseReferenceData = { id: event.id, name: event.payload.name };

		await this.refService.updateRef(org, data);
	}
}
