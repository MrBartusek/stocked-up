import { Types } from 'mongoose';
import { WarehouseDocument } from '../schemas/warehouse.schema';

export class WarehouseDeletedEvent {
	public readonly id: Types.ObjectId;
	public readonly payload: WarehouseDocument;

	constructor(warehouse: WarehouseDocument) {
		this.id = warehouse._id;
		this.payload = warehouse;
	}
}
