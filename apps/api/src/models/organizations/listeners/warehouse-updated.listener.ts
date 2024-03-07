import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseCreatedEvent } from '../../warehouses/events/warehouse-created.event';
import {
	OrganizationsWarehouseRefService,
	WarehouseReferenceData,
} from '../organizations-warehouse-ref.service';

@Injectable()
export class WarehouseUpdatedListener {
	constructor(private readonly refService: OrganizationsWarehouseRefService) {}

	@OnEvent('warehouse.updated', { async: true, suppressErrors: false })
	async handleWarehouseUpdate(event: WarehouseCreatedEvent) {
		const org = event.payload.organization;
		const data: WarehouseReferenceData = { id: event.id, name: event.payload.name };

		await this.refService.updateRef(org, data);
	}
}
