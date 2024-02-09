import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { UsersService } from '../users.service';

@Injectable()
export class ConfirmedGuard implements CanActivate {
	constructor(private readonly userService: UsersService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();

		const sessionDataConfirmed = request.user.isConfirmed;
		if (sessionDataConfirmed) {
			return true;
		}

		const userId = new Types.ObjectId(request.user.id);
		const user = await this.userService.findById(userId);
		const dbDataConfirmed = user.profile.isConfirmed;
		if (!dbDataConfirmed) {
			throw new ForbiddenException(
				'You need to confirm your E-mail address to perform this operation',
			);
		}

		return true;
	}
}
