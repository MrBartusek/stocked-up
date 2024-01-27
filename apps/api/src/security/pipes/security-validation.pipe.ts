import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { OrganizationResolverService } from '../../organization-resolver/organization-resolver.service';
import { SecurityService } from '../security.service';

@Injectable({ scope: Scope.REQUEST })
export class SecurityValidationPipe<T> implements PipeTransform<T> {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly securityService: SecurityService,
		private readonly organizationResolverService: OrganizationResolverService,
	) {}

	async transform(dto: T): Promise<T> {
		console.warn('dto security check not implemented');

		return dto;
	}
}
