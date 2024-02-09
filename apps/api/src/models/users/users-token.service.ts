import { Injectable } from '@nestjs/common';
import { addDays, isPast } from 'date-fns';
import { Types } from 'mongoose';
import { CryptoUtils } from '../../security/helpers/crypto.utils';
import { UsersService } from './users.service';

const DEFAULT_TOKEN_EXPIRE_HOURS = 7 * 24;

export interface GenerateTokenOptions {
	userId: Types.ObjectId;
	type: string;
	lastRetry?: Date;
	expireHours?: number;
}

export interface ValidateTokenOptions {
	userId: Types.ObjectId;
	type: string;
	token: string;
}

@Injectable()
export class UsersTokenService {
	constructor(private readonly usersService: UsersService) {}

	async generateAndSaveToken({
		userId,
		type,
		expireHours,
	}: GenerateTokenOptions): Promise<string | null> {
		const user = await this.usersService.findById(userId);
		if (!user) return null;

		const token = CryptoUtils.generateSafeToken(64);
		const expireAt = addDays(new Date(), expireHours || DEFAULT_TOKEN_EXPIRE_HOURS);
		const lastRetry = new Date();

		const newTokenList = user.tokens.filter((t) => t.type != type);
		newTokenList.push({ type, token, expireAt, lastRetry });
		await this.usersService.findOneByIdAndUpdate(user._id, { tokens: newTokenList });

		return token;
	}

	async getLastRetry(userId: Types.ObjectId, type: string): Promise<Date | null> {
		const user = await this.usersService.findById(userId);
		if (!user) return null;

		const result = user.tokens.find((tokenObj) => tokenObj.type == type);
		if (!result) return null;

		return result.lastRetry;
	}

	async validateToken({ userId, type, token }: ValidateTokenOptions): Promise<boolean> {
		const user = await this.usersService.findById(userId);
		if (!user) return false;

		const result = user.tokens.find((tokenObj) => tokenObj.token == token);
		if (!result) return false;

		const invalidType = result.type != type;
		const expired = isPast(result.expireAt);

		return !invalidType && !expired;
	}

	async invalidateToken(userId: Types.ObjectId, token: string): Promise<void> {
		const user = await this.usersService.findById(userId);
		if (!user) return;

		const newTokenList = user.tokens.filter((tokenObj) => tokenObj.token != token);
		await this.usersService.findOneByIdAndUpdate(user._id, { tokens: newTokenList });
	}
}
