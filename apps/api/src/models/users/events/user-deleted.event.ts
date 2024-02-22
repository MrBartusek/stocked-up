import { Types } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { UserProfile } from '../schemas/user-profile.schema';

export class UserDeletedEvent {
	public readonly id: Types.ObjectId;
	public readonly payload: UserProfile;

	constructor(user: UserDocument) {
		this.id = user._id;
		this.payload = user.profile;
	}
}
