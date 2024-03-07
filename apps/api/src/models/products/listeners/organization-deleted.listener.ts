import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationDeleteEvent } from '../../organizations/events/organization-deleted.event';
import { ProductsService } from '../products.service';

@Injectable()
export class OrganizationDeletedListener {
	constructor(private readonly productsService: ProductsService) {}

	@OnEvent('organization.deleted', { async: true, suppressErrors: false })
	async handleProductDelete(event: OrganizationDeleteEvent) {
		await this.productsService.deleteManyByOrg(event.id);
	}
}
