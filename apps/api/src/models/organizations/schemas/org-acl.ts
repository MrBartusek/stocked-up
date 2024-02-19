import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';

export type OrgAclDocument = HydratedDocument<OrgAcl>;

@Schema({ _id: false })
export class OrgAcl {
	@Prop({ ref: 'User', required: true, index: true })
	user: Types.ObjectId;

	@Prop({ required: true })
	role: OrganizationSecurityRole;
}

export const OrgAclSchema = SchemaFactory.createForClass(OrgAcl);
