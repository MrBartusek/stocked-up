import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/models/users/schemas/user.schema';

export type OrgAclDocument = HydratedDocument<OrgAcl>;

@Schema({ _id: false })
export class OrgAcl {
	@Prop({ required: true })
	role: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	id: User;
}

export const OrgAclSchema = SchemaFactory.createForClass(OrgAcl);
