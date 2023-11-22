import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PrivateUserDto, UserDto } from 'shared-types';
import { UserAuth } from './auth.schema';
import { UserProfile } from './profile.schema copy';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ type: UserProfile, required: true })
	profile: UserProfile;

	@Prop({ type: UserAuth, required: true })
	auth: UserAuth;

	public static toDto(document: UserDocument): UserDto {
		return {
			id: document._id,
			username: document.profile.username,
		};
	}

	public static toPrivateDto(document: UserDocument): PrivateUserDto {
		return {
			...User.toDto(document),
			email: document.profile.email,
		};
	}
}

export const UserSchema = SchemaFactory.createForClass(User);
