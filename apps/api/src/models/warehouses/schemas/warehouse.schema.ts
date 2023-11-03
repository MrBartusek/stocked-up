import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema()
export class Warehouse {
	@Prop({ required: true })
	name: string;

	@Prop()
	address: string;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
