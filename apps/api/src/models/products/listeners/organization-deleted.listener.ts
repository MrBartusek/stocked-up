import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductsService } from '../products.service';
import { OrganizationDeleteEvent } from '../../organizations/events/organization-deleted.event';

@Injectable()
export class OrganizationDeletedListener {
	constructor(private readonly productsService: ProductsService) {}

	@OnEvent('organization.deleted', { async: true })
	async handleProductDelete(event: OrganizationDeleteEvent) {
		await this.productsService.deleteManyByOrg(event.id);
	}
}
