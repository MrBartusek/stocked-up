import { Types } from 'mongoose';
import { InventoryItemDocument } from '../schemas/inventory-item.schema';

export class InventoryUpdatedEvent {
	public readonly id: Types.ObjectId;
	public readonly payload: InventoryItemDocument;

	constructor(item: InventoryItemDocument) {
		this.id = item._id;
		this.payload = item;
	}
}
