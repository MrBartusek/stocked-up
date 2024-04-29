import { ForbiddenException, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { SecurityUtils } from '../helpers/security.utils';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class HasAdminAccessPipe implements PipeTransform<Types.ObjectId> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
	) {}

	async transform(value: Types.ObjectId): Promise<Types.ObjectId> {
		const userId = new Types.ObjectId(this.request.user.id);
		const role = await this.securityService.getUserRole(value, userId);

		const hasAccess = SecurityUtils.isRoleEnough(role, OrganizationSecurityRole.ADMIN);

		if (!hasAccess) {
			throw new ForbiddenException('Organization admin org higher access required');
		}

		return value;
	}
}
