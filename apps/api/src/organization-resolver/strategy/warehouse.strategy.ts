import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { WarehousesService } from '../../models/warehouses/warehouses.service';
import { ResolverStrategy } from '../types/resolver-strategy.type';

@Injectable()
export class WarehouseStrategy implements ResolverStrategy {
	constructor(private readonly warehousesService: WarehousesService) {}

	async resolve(id: Types.ObjectId): Promise<Types.ObjectId> {
		const warehouse = await this.warehousesService.findById(id);
		if (!warehouse) return null;
		return warehouse.organization;
	}
}
