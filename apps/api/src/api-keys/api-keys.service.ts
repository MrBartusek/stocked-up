import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import * as crypto from 'node:crypto';
import { ApiKeyDto } from 'shared-types';
import { UserProfile } from '../models/users/schemas/user-profile.schema';
import { UserRepository } from '../models/users/users.repository';
import { UserDocument } from '../models/users/schemas/user.schema';

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

	async validateKey(input: string): Promise<UserDocument | null> {
		const [userIdString] = input.split('.');
		if (!userIdString) return null;
		const userId = new Types.ObjectId(userIdString);

		const user = await this.userRepository.findById(userId);
		if (!user) return null;

		const apiKey = user.auth.apiKey;
		const keyValid = apiKey == input;
		return keyValid ? user : null;
	}

	private generateApiKey(userId: Types.ObjectId): string {
		const randomHash = crypto.randomBytes(32).toString('hex');
		return `${userId}.${randomHash}`;
	}
}
