import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This guard is not responsible for login user is using
 * username and password. Only use this guard on login endpoint.
 */
export class LocalAuthGuard extends AuthGuard('local') {
	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();

		await super.logIn(request);
		return result;
	}
}
