import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PrivateUserDto, UserDto } from 'shared-types';
import DtoHelper from '../../../helpers/dto.helper';
import { UserAuth } from './user-auth.schema';
import { UserProfile } from './user-profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop({ type: UserProfile, required: true })
	profile: UserProfile;

	@Prop({ type: UserAuth, required: true })
	auth: UserAuth;

	@Prop()
	createdAt?: Date;

	@Prop()
	updatedAt?: Date;

	public static toDto(document: UserDocument): UserDto {
		return {
			id: document._id,
			username: document.profile.username,
			image: DtoHelper.getImageDto(document.profile.imageKey),
		};
	}

	public static toPrivateDto(document: UserDocument): PrivateUserDto {
		return {
			...User.toDto(document),
			email: document.profile.email,
			isDemo: document.profile.isDemo,
			isActive: document.profile.isActive,
		};
	}
}

export const UserSchema = SchemaFactory.createForClass(User);
