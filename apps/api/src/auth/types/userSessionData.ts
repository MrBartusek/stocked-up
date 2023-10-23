import { UserProfile } from 'src/models/users/schemas/profile.schema copy';

interface UserSessionData extends UserProfile {
	id: string;
}

export default UserSessionData;
