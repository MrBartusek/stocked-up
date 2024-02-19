import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DemoLockedException } from '../../../exceptions/demo-locked.exception';

@Injectable()
export class NotDemoGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();
		const { isDemo } = request.user;
		if (isDemo) {
			throw new DemoLockedException();
		}
		return !isDemo;
	}
}
