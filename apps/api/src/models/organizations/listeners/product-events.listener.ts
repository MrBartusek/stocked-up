import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductDeletedEvent } from '../../products/events/product-deleted.event';
import { ProductUpdatedEvent } from '../../products/events/product-updated.event';
import { OrganizationsStatsService } from '../organizations-stats.service';

@Injectable()
export class ProductEventsListener {
	constructor(private readonly organizationsStatsService: OrganizationsStatsService) {}

	@OnEvent('product.created', { async: true, suppressErrors: false })
	@OnEvent('product.deleted', { async: true, suppressErrors: false })
	async handleProductEvent(event: ProductUpdatedEvent | ProductDeletedEvent) {
		const orgId = event.payload.organization;
		await this.organizationsStatsService.updateProductsCount(orgId);
	}
}
