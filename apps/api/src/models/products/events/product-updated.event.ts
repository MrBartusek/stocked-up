import { Types } from 'mongoose';
import { ProductDocument } from '../schemas/product.schema';

export class ProductUpdatedEvent {
	public readonly id: Types.ObjectId;
	public readonly payload: ProductDocument;

	constructor(product: ProductDocument) {
		this.id = product._id;
		this.payload = product;
	}
}
