import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BasicInventoryItemDto, InventoryItemDto } from 'shared-types';
import DtoHelper from '../../../helpers/dto.helper';
import { ProductDocument } from '../../products/schemas/product.schema';

export type InventoryItemDocument = HydratedDocument<InventoryItem>;

@Schema()
export class InventoryItem {
	@Prop({ ref: 'Organization' })
	organization: Types.ObjectId;

	@Prop({ ref: 'Warehouse', index: true })
	warehouse: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Product', index: true })
	product: Types.ObjectId | ProductDocument;

	@Prop({ default: 0 })
	quantity: number;

	@Prop({ required: false })
	location: string;

	public static toBasicDto(document: InventoryItemDocument): BasicInventoryItemDto {
		if (document.product instanceof Types.ObjectId) {
			throw new Error(`Inventory item without aggregated product can't be converted to DTO`);
		}

		return {
			id: document._id,
			quantity: document.quantity,
			productId: document.product._id.toString(),
			image: DtoHelper.getImageDto(document.product.imageKey),
			unit: document.product.unit,
			name: document.product.name,
		};
	}

	public static toDto(document: InventoryItemDocument): InventoryItemDto {
		if (document.product instanceof Types.ObjectId) {
			throw new Error(`Inventory item without aggregated product can't be converted to DTO`);
		}

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
