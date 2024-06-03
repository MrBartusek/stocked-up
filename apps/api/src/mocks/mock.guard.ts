import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		return true;
	}
}
