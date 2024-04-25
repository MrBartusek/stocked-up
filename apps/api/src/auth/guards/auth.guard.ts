import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import * as Passport from '@nestjs/passport';

export interface AuthGuardOptions {
	/**
	 * Should this resource be restricted from users
	 * authenticating using API
	 */
	disablePublicApiAccess: boolean;
}

/**
 * This guard validates if user is authenticated. There are two checks made:
 *
 * - Does this user have authenticated (created by LocalAuthGuard or similar guard)
 * - Does this request have valid Bearer token (API key authentication, without session)
 */
@Injectable()
export class AuthGuard extends Passport.AuthGuard('bearer') {
	constructor(private readonly options?: AuthGuardOptions) {
		super();
	}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		// Check if user is already authenticated (by session)
		const isSessionAuthenticated = request.isAuthenticated();
		if (isSessionAuthenticated) return true;

		// If session is not present, try to authenticate using API key
		const isBearerAuthenticated = await super.canActivate(context);
		if (!isBearerAuthenticated) return false;

		if (this.options?.disablePublicApiAccess) {
			throw new ForbiddenException("You can't access this resource with API key");
		}

		return true;
	}
}
