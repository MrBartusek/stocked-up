import { Types } from 'mongoose';
import { WarehouseDocument } from '../schemas/warehouse.schema';

export class WarehouseRecalculatedEvent {
	public readonly id: Types.ObjectId;
	public readonly totalValue: number;
	public readonly payload: WarehouseDocument;

	constructor(warehouse: WarehouseDocument) {
		this.id = warehouse._id;
		this.totalValue = warehouse.totalValue;
		this.payload = warehouse;
	}
}
