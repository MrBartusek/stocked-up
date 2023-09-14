import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Utils from 'src/utils';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ ...Utils.schemaSerializerHelper })
export class Product {
	@Prop({ required: true })
	name: string;

	@Prop({ default: 0 })
	buyPrice: string;

	@Prop({ default: 0 })
	sellPrice: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
