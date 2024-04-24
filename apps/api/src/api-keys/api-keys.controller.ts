import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { ApiKeyDto } from 'shared-types';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { ApiKeysService } from './api-keys.service';
import { NotDemoGuard } from '../models/users/guards/not-demo.guard';

@Controller('api-keys')
@ApiExcludeController()
@UseGuards(NotDemoGuard)
@UseGuards(AuthenticatedGuard)
export class ApiKeysController {
	constructor(private readonly apiKeysService: ApiKeysService) {}

	@Get()
	get(@Req() request: Request): Promise<ApiKeyDto> {
		const userId = new Types.ObjectId(request.user.id);
		return this.apiKeysService.getKeyForUser(userId);
	}

	@Post('regenerate')
	regenerate(@Req() request: Request) {
		const userId = new Types.ObjectId(request.user.id);
		return this.apiKeysService.regenerateKeyForUser(userId);
	}
}
