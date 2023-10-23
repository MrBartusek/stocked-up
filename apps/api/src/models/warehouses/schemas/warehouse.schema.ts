import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductInWarehouseDocument, ProductInWarehouseSchema } from './product-in-warehouse';

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema()
export class Warehouse {
	@Prop({ required: true })
	id: string;

	@Prop({ required: true })
	name: string;

	@Prop()
	address: string;

	@Prop({ type: [ProductInWarehouseSchema], required: true, default: [] })
	products: ProductInWarehouseDocument[];
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
