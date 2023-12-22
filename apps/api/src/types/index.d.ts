import UserSessionData from '../auth/types/userSessionData';

export {};

declare global {
	namespace Express {
		export interface User extends UserSessionData {}
	}
}
