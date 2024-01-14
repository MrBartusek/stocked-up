import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrgWarehouseReferenceDocument = HydratedDocument<OrgWarehouseReference>;

@Schema({ _id: false })
export class OrgWarehouseReference {
	@Prop({ required: true })
	name: string;

	@Prop()
	id: Types.ObjectId;
}

export const OrgWarehouseReferenceSchema = SchemaFactory.createForClass(OrgWarehouseReference);
