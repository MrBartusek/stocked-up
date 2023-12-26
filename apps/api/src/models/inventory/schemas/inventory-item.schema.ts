import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BasicInventoryItemDto, InventoryItemDto } from 'shared-types';
import DtoHelper from '../../../helpers/dto.helper';
import { ProductDocument } from '../../products/schemas/product.schema';
import { Warehouse } from '../../warehouses/schemas/warehouse.schema';

export type InventoryItemDocument = HydratedDocument<InventoryItem>;

@Schema()
export class InventoryItem {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' })
	warehouse: Warehouse;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
	product: ProductDocument;

	@Prop({ default: 0 })
	quantity: number;

	@Prop({ required: false })
	location: string;

	public static toBasicDto(document: InventoryItemDocument): BasicInventoryItemDto {
		const isProductMongoId = mongoose.isValidObjectId(document.product);

		return {
			id: document._id,
			productId: isProductMongoId ? (document.product as any) : document.product._id.toString(),
			image: DtoHelper.getImageDto(document.product.imageKey),
			name: document.product.name,
			quantity: document.quantity,
			unit: document.product.unit,
		};
	}

	public static toDto(document: InventoryItemDocument): InventoryItemDto {
		return {
			...InventoryItem.toBasicDto(document),
			description: document.product.description,
			buyPrice: document.product.buyPrice,
			sellPrice: document.product.sellPrice,
			location: document.location,
		};
	}
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
