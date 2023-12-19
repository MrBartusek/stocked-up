import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BasicProductDto, ProductDto } from 'shared-types';
import DtoHelpers from '../../../helpers/dtoHelpers';
import { Organization } from '../../organizations/schemas/organization.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
	organization: Organization;

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
			image: DtoHelpers.getImageDto(document.imageKey),
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
