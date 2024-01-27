import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InventoryService } from '../../models/inventory/inventory.service';
import { ResolverStrategy } from '../types/resolver-strategy.type';

@Injectable()
export class InventoryStrategy implements ResolverStrategy {
	constructor(private readonly inventoryService: InventoryService) {}

	async resolve(id: Types.ObjectId): Promise<Types.ObjectId> {
		const item = await this.inventoryService.findOne(id);
		if (!item) return null;
		return item.organization;
	}
}
