import { ForbiddenException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types } from 'mongoose';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class HasOrganizationAccessPipe implements PipeTransform<Types.ObjectId> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
	) {}

	async transform(value: Types.ObjectId): Promise<Types.ObjectId> {
		const userId = new Types.ObjectId(this.request.user.id);
		const hasAccess = await this.securityService.hasOrganizationAccess(value, userId);

		if (!hasAccess) {
			throw new ForbiddenException('Organization access denied');
		}

		return value;
	}
}
