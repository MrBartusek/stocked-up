import UserSessionData from 'src/auth/types/userSessionData';

export {};

declare global {
	namespace Express {
		export interface User extends UserSessionData {}
	}
}
