import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductDeletedEvent } from '../../products/events/product-deleted.event';
import { InventoryService } from '../inventory.service';

@Injectable()
export class ProductDeletedListener {
	constructor(private readonly inventoryService: InventoryService) {}

	@OnEvent('product.deleted', { async: true, suppressErrors: false })
	async handleProductDelete(event: ProductDeletedEvent) {
		await this.inventoryService.deleteManyByProduct(event.id);
	}
}
