import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrgStatsDocument = HydratedDocument<OrgStats>;

@Schema({ _id: false })
export class OrgStats {
	@Prop({ default: 0 })
	totalProducts: number;

	@Prop({ default: 0 })
	totalValue: number;

	@Prop({ default: 0 })
	totalQuantity: number;
}

export const OrgStatsSchema = SchemaFactory.createForClass(OrgStats);
