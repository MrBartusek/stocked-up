import {
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	PipeTransform,
	Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import mongoose, { Types } from 'mongoose';
import {
	ORGANIZATION_ACCESS_DECORATOR_KEY,
	OrganizationAccessDecoratorMetadata,
} from '../../models/organizations/types/org-access-decorator-metadata';
import { OrganizationResolverService } from '../../organization-resolver/organization-resolver.service';
import { SecurityUtils } from '../helpers/security.utils';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class SecurityValidationPipe<T> implements PipeTransform<T> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
		private readonly organizationResolverService: OrganizationResolverService,
	) {}

	private lockedOrganizationId: Types.ObjectId | null = null;

	async transform(dto: T): Promise<T> {
		const userId = new Types.ObjectId(this.request.user.id);

		for (const propertyKey in dto) {
			const metadata = this.getPropertyMetadata(dto, propertyKey);
			if (!metadata) continue;
			const value = this.getObjectIdFromProperty(dto, propertyKey);

			const organization = await this.organizationResolverService.resolve(value, metadata.resource);
			if (!organization) {
				throw new NotFoundException(`${propertyKey} - ${metadata.resource} not found`);
			}
			this.checkOrganizationLock(organization);

			const role = await this.securityService.getUserRole(organization, userId);
			if (!role) {
				throw new ForbiddenException(`${propertyKey} - access denied`);
			}
			const hasAccess = SecurityUtils.isRoleEnough(role, metadata.role);
			if (!hasAccess) {
				throw new ForbiddenException(`${propertyKey} - access denied by organization ACL rules`);
			}
		}

		return dto;
	}

	checkOrganizationLock(organization: Types.ObjectId) {
		if (this.lockedOrganizationId == null) {
			this.lockedOrganizationId = organization;
		}
		if (!this.lockedOrganizationId.equals(organization)) {
			throw new Error(`Mismatched organization across entities`);
		}
	}

	getPropertyMetadata(
		dto: any,
		propertyKey: string,
	): OrganizationAccessDecoratorMetadata | undefined {
		return Reflect.getMetadata(ORGANIZATION_ACCESS_DECORATOR_KEY, dto, propertyKey);
	}

	getObjectIdFromProperty(dto: any, propertyKey: string): Types.ObjectId {
		const value = dto[propertyKey] as Types.ObjectId;
		if (!mongoose.isValidObjectId(value)) {
			throw new Error(`${propertyKey} - Invalid MongoDB id`);
		}
		return new Types.ObjectId(value);
	}
}
