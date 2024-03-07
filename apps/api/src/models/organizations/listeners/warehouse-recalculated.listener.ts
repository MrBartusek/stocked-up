import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseRecalculatedEvent } from '../../warehouses/events/warehouse-recalculated.event';
import { OrganizationsStatsService } from '../organizations-stats.service';

@Injectable()
export class WarehouseRecalculatedListener {
	constructor(private readonly organizationsStatsService: OrganizationsStatsService) {}

	@OnEvent('warehouse.recalculated', { async: true, suppressErrors: false })
	async handleWarehouseRecalculation(event: WarehouseRecalculatedEvent) {
		const org = event.payload.organization;
		await this.organizationsStatsService.updateTotalValue(org);
	}
}
