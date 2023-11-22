import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Warehouse } from '../../warehouses/schemas/warehouse.schema';

export type OrgWarehouseReferenceDocument = HydratedDocument<OrgWarehouseReference>;

@Schema({ _id: false })
export class OrgWarehouseReference {
	@Prop({ required: true })
	name: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' })
	id: Warehouse;
}

export const OrgWarehouseReferenceSchema = SchemaFactory.createForClass(OrgWarehouseReference);
