import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BasicProductDto, ProductDto } from 'shared-types';
import { Organization } from '../../organizations/schemas/organization.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
	organization: Organization;

	@Prop({ required: true, index: 'text' })
	name: string;

	@Prop()
	description: string;

	@Prop({ default: 0 })
	buyPrice: number;

	@Prop({ default: 0 })
	sellPrice: number;

	@Prop({ default: 'box' })
	unit: string;

	public static toBasicDto(document: ProductDocument): BasicProductDto {
		return {
			id: document._id,
			name: document.name,
			buyPrice: document.buyPrice,
			sellPrice: document.sellPrice,
			unit: document.unit,
		};
	}

	public static toDto(document: ProductDocument): ProductDto {
		return {
			...Product.toBasicDto(document),
			description: document.description,
		};
	}
}

export const ProductSchema = SchemaFactory.createForClass(Product);
