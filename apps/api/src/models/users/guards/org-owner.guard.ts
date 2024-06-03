import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { OrganizationsService } from '../../organizations/organizations.service';

@Injectable()
export class NotOrgOwnerGuard implements CanActivate {
	constructor(private readonly organizationsService: OrganizationsService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();
		const user = new Types.ObjectId(request.user.id);

		const isOwner = await this.organizationsService.isUserOwnerOfAny(user);

		if (isOwner) {
			throw new BadRequestException(
				'In order to delete account you must first transfer ownership of ' +
					'all organizations that you own.',
			);
		}

		return true;
	}
}
