import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrganizationDto } from 'shared-types';
import { OrgAcl, OrgAclSchema } from './org-acl';
import { OrgSettings, OrgSettingsSchema } from './org-settings';
import { OrgStats, OrgStatsSchema } from './org-stats';
import {
	OrgWarehouseReference,
	OrgWarehouseReferenceSchema,
} from './org-warehouse-reference.schema';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
	@Prop({ required: true })
	name: string;

	@Prop({ type: OrgStatsSchema, default: {} })
	stats: OrgStats;

	@Prop({ type: OrgSettingsSchema, default: {} })
	settings: OrgSettings;

	@Prop({ type: [OrgAclSchema], default: [], index: true })
	acls: OrgAcl[];

	@Prop({ type: [OrgWarehouseReferenceSchema], default: [] })
	warehouses: OrgWarehouseReference[];

	public static toDto(document: OrganizationDocument): OrganizationDto {
		return {
			id: document._id,
			name: document.name,
			stats: document.stats,
			settings: document.settings,
			warehouses: document.warehouses,
		};
	}
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
