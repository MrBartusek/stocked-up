import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationDeleteEvent } from '../../organizations/events/organization-deleted.event';
import { WarehousesService } from '../warehouses.service';

@Injectable()
export class OrganizationDeletedListener {
	constructor(private readonly warehousesService: WarehousesService) {}

	@OnEvent('organization.deleted', { async: true, suppressErrors: false })
	async handleOrgDelete(event: OrganizationDeleteEvent) {
		const warehouseList = event.payload.warehouses;

		for (const warehouse of warehouseList) {
			await this.warehousesService.delete(warehouse.id);
		}
	}
}
