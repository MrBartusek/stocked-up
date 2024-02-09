import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserTokenDocument = HydratedDocument<UserToken>;

export class UserToken {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	token: string;

	@Prop({ required: true })
	expireAt: Date;

	@Prop({ required: true })
	lastRetry: Date | null;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
