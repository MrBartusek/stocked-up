import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NotDemoGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();
		const { isDemo } = request.user;
		if (isDemo) {
			throw new ForbiddenException('This action is not available for demo accounts');
		}
		return !isDemo;
	}
}
