import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
	OrgWarehouseReference,
	OrgWarehouseReferenceSchema,
} from './org-warehouse-reference.schema';
import { OrgAcl, OrgAclSchema } from './org-acl';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
	@Prop({ required: true })
	name: string;

	@Prop({ default: 'USD' })
	currency: string;

	@Prop({ default: 0 })
	totalValue: number;

	@Prop({ type: [OrgAclSchema], default: [] })
	acls: OrgAcl[];

	@Prop({ type: [OrgWarehouseReferenceSchema], default: [] })
	warehouses: OrgWarehouseReference[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
