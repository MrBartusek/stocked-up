import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrganizationACLRole } from './org-acl-role';

export type OrgAclDocument = HydratedDocument<OrgAcl>;

@Schema({ _id: false })
export class OrgAcl {
	@Prop({ ref: 'User', required: true })
	user: Types.ObjectId;

	@Prop({ required: true })
	role: OrganizationACLRole;
}

export const OrgAclSchema = SchemaFactory.createForClass(OrgAcl);
