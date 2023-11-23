import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrganizationDto } from 'shared-types';
import { OrgAcl, OrgAclSchema } from './org-acl';
import { OrgStats, OrgStatsSchema } from './org-stats';
import {
	OrgWarehouseReference,
	OrgWarehouseReferenceSchema,
} from './org-warehouse-reference.schema';
import { OrgSettings, OrgSettingsSchema } from './org-settings';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
	@Prop({ required: true })
	name: string;

	@Prop({ default: 'USD' })
	currency: string;

	@Prop({ type: OrgStatsSchema, default: {} })
	stats: OrgStats;

	@Prop({ type: OrgSettingsSchema, default: {} })
	settings: OrgSettings;

	@Prop({ type: [OrgAclSchema], default: [] })
	acls: OrgAcl[];

	@Prop({ type: [OrgWarehouseReferenceSchema], default: [] })
	warehouses: OrgWarehouseReference[];

	public static toDto(document: OrganizationDocument): OrganizationDto {
		return {
			id: document._id,
			name: document.name,
			currency: document.currency,
			stats: document.stats,
			settings: document.settings,
			warehouses: document.warehouses,
		};
	}
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
