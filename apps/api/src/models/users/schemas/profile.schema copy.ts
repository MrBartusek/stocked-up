import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProfileDocument = HydratedDocument<UserProfile>;

export class UserProfile {
	@Prop({ required: true })
	username: string;

	@Prop()
	email: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
