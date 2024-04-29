import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Currency } from 'country-code-enum';
import { HydratedDocument } from 'mongoose';

export type OrgSettingsDocument = HydratedDocument<OrgSettings>;

export enum OrgValueCalculationStrategy {
	BuyPrice = 'buyPrice',
	SellPrice = 'sellPrice',
}

@Schema({ _id: false })
export class OrgSettings {
	@Prop({
		type: String,
		enum: Object.values(Currency),
		default: Currency.USD,
	})
	currency: Currency;

	@Prop({
		type: String,
		enum: Object.values(OrgValueCalculationStrategy),
		default: OrgValueCalculationStrategy.SellPrice,
	})
	valueCalculationStrategy: OrgValueCalculationStrategy;
}

export const OrgSettingsSchema = SchemaFactory.createForClass(OrgSettings);
