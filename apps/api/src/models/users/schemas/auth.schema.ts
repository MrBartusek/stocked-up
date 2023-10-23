import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserAuthDocument = HydratedDocument<UserAuth>;

export class UserAuth {
	@Prop()
	password: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
