import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserProfile } from './profile.schema copy';
import { UserAuth } from './auth.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ type: UserProfile, required: true })
	profile: UserProfile;

	@Prop({ type: UserAuth, required: true })
	auth: UserAuth;
}

export const UserSchema = SchemaFactory.createForClass(User);
