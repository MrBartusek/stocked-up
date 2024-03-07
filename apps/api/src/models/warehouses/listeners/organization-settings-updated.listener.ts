import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationUpdatedEvent } from '../../organizations/events/organization-updated.event';
import { WarehouseStatsService } from '../warehouse-stats.service';

@Injectable()
export class OrganizationSettingsUpdatedListener {
	constructor(private readonly warehouseStatsService: WarehouseStatsService) {}

	@OnEvent('organization.settings.updated', { async: true, suppressErrors: false })
	async handleOrganizationUpdated(event: OrganizationUpdatedEvent) {
		const organization = event.payload;
		const warehouseList = organization.warehouses;

		for await (const warehouse of warehouseList) {
			await this.warehouseStatsService.recalculateTotalValue(warehouse.id);
		}
	}
}
