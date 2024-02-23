import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationUpdatedEvent } from '../../organizations/events/organization-updated.event';
import { WarehousesService } from '../warehouses.service';

@Injectable()
export class OrganizationSettingsUpdatedListener {
	constructor(private readonly warehousesService: WarehousesService) {}

	@OnEvent('organization.settings.updated', { async: true })
	async handleOrganizationUpdated(event: OrganizationUpdatedEvent) {
		const organization = event.payload;
		const warehouseList = organization.warehouses;

		for await (const warehouse of warehouseList) {
			await this.warehousesService.recalculateTotalValue(warehouse.id);
		}
	}
}
