import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BasicProductDto, ProductDto } from 'shared-types';
import DtoHelper from '../../../helpers/dto.helper';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
	@Prop({ ref: 'Organization', index: true })
	organization: Types.ObjectId;

	@Prop({ required: true, index: 'text' })
	name: string;

	@Prop()
	imageKey: string;

	@Prop()
	description: string;

	@Prop()
	sku: string;

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
			image: DtoHelper.getImageDto(document.imageKey),
			buyPrice: document.buyPrice,
			sellPrice: document.sellPrice,
			unit: document.unit,
		};
	}

	public static toDto(document: ProductDocument): ProductDto {
		return {
			...Product.toBasicDto(document),
			description: document.description,
			sku: document.sku,
		};
	}
}

export const ProductSchema = SchemaFactory.createForClass(Product);
