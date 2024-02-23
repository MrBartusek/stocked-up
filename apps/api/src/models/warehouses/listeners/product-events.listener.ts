import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationsService } from '../../organizations/organizations.service';
import { ProductUpdatedEvent } from '../../products/events/product-updated.event';
import { WarehousesService } from '../warehouses.service';

@Injectable()
export class ProductUpdatedListener {
	constructor(
		private readonly warehousesService: WarehousesService,
		private readonly organizationsService: OrganizationsService,
	) {}

	@OnEvent('product.updated', { async: true })
	async handleProductEvent(event: ProductUpdatedEvent) {
		// Product price may have been changed so, recalculate all warehouses
		// in organization

		const orgId = event.payload.organization;
		const organization = await this.organizationsService.findById(orgId);

		const warehouseList = organization.warehouses;
		for await (const warehouse of warehouseList) {
			await this.warehousesService.recalculateTotalValue(warehouse.id);
		}
	}
}
