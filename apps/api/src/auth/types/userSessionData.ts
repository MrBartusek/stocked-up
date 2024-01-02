import { UserProfile } from '../../models/users/schemas/user-profile.schema';

interface UserSessionData extends UserProfile {
	id: string;
}

export default UserSessionData;
