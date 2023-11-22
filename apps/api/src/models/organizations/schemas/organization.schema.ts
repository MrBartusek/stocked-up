import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrganizationDto } from 'shared-types';
import { OrgAcl, OrgAclSchema } from './org-acl';
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

	@Prop({ default: 'USD' })
	currency: string;

	@Prop({ type: OrgStatsSchema, default: {} })
	stats: OrgStats;

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
			warehouses: document.warehouses,
		};
	}
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
