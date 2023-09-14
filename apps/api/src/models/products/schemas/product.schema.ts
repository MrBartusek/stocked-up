import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ default: 0 })
	buyPrice: number;

	@Prop({ default: 0 })
	sellPrice: number;

	@Prop()
	unit: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
