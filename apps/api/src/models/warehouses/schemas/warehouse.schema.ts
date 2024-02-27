import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WarehouseDto } from 'shared-types';

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema()
export class Warehouse {
	@Prop({ required: true, index: true })
	organization: Types.ObjectId;

	@Prop({ required: true, index: 'text' })
	name: string;

	@Prop()
	address: string;

	@Prop({ default: 0 })
	totalValue: number;

	@Prop({ default: 0 })
	totalQuantity: number;

	public static toDto(entity: WarehouseDocument): WarehouseDto {
		return {
			id: entity._id,
			name: entity.name,
			address: entity.address,
			totalValue: entity.totalValue,
		};
	}
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
