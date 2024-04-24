import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import * as crypto from 'node:crypto';
import { ApiKeyDto } from 'shared-types';
import { UserRepository } from '../models/users/users.repository';

@Injectable()
export class ApiKeysService {
	constructor(private readonly userRepository: UserRepository) {}

	async getKeyForUser(userId: Types.ObjectId): Promise<ApiKeyDto | null> {
		const user = await this.userRepository.findById(userId, { auth: 1 });
		if (!user) return null;

		const apiKey = user.auth.apiKey;
		if (apiKey) {
			return { user: userId.toString(), apiKey };
		}

		return this.regenerateKeyForUser(userId);
	}

	async regenerateKeyForUser(userId: Types.ObjectId): Promise<ApiKeyDto | null> {
		const apiKey = this.generateApiKey(userId);
		const user = await this.userRepository.findOneAndUpdate(userId, {
			'auth.apiKey': apiKey,
		});
		if (!user) return null;

		return { user: userId.toString(), apiKey };
	}

	private generateApiKey(userId: Types.ObjectId): string {
		const randomHash = crypto.randomBytes(32).toString('hex');
		return `${userId}.${randomHash}`;
	}
}
