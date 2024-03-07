import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WarehouseDeletedEvent } from '../../warehouses/events/warehouse-deleted.event';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';

@Injectable()
export class WarehouseDeletedListener {
	constructor(
		private readonly refService: OrganizationsWarehouseRefService,
		private readonly organizationsStatsService: OrganizationsStatsService,
	) {}

	@OnEvent('warehouse.deleted', { async: true, suppressErrors: false })
	async handleWarehouseDelete(event: WarehouseDeletedEvent) {
		const org = event.payload.organization;
		await this.refService.deleteRef(org, event.id);
		await this.organizationsStatsService.updateTotalValue(org);
	}
}
