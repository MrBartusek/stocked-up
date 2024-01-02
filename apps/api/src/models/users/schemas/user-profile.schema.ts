import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserProfileDocument = HydratedDocument<UserProfile>;

export class UserProfile {
	@Prop({ required: true })
	username: string;

	@Prop({ required: true })
	email: string;

	@Prop()
	imageKey: string | null;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
