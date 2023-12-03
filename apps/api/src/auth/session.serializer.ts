import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from '../models/users/schemas/user.schema';
import UserSessionData from './types/userSessionData';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: UserDocument, done: (err: Error, user: UserSessionData) => void) {
		const data: UserSessionData = {
			...user.profile,
			id: user._id.toString(),
		};
		done(null, data);
	}
	deserializeUser(payload: UserSessionData, done: (err: Error, payload: UserSessionData) => void) {
		done(null, payload);
	}
}
