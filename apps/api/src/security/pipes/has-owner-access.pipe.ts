import { ForbiddenException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types } from 'mongoose';
import { SecurityService } from '../security.service';
import { SecurityUtils } from '../helpers/security.utils';
import { OrganizationSecurityRole } from 'shared-types';

@Injectable({ scope: Scope.REQUEST })
export class HasOwnerAccessPipe implements PipeTransform<Types.ObjectId> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
	) {}

	async transform(value: Types.ObjectId): Promise<Types.ObjectId> {
		const userId = new Types.ObjectId(this.request.user.id);
		const role = await this.securityService.getUserRole(value, userId);

		const hasAccess = SecurityUtils.isRoleEnough(role, OrganizationSecurityRole.OWNER);

		if (!hasAccess) {
			throw new ForbiddenException('Organization owner access required');
		}

		return value;
	}
}
