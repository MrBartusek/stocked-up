import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async registerUser(data: UserRegisterDto): Promise<UserDocument> {
		const hash = await this.hashPassword(data.password);

		const user = await this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});

		return user;
	}

	/**
	 * Validates user password of user with provided username. This is simply
	 * a check of username:password pair.
	 *
	 * @param username username of user
	 * @param password raw password
	 * @returns user if user is found and password is valid; null if not
	 */
	async validateUserByUsername(username: string, password: string): Promise<UserDocument | null> {
		const user = await this.usersService.findOne(username);
		const valid = await this.validateUser(user, password);

		if (!user || !valid) {
			return null;
		}

		return user;
	}

	/**
	 * Validates user password of user with provided id.
	 *
	 * @param id id of checked user
	 * @param password raw password
	 * @returns user if user is found and password is valid; null if not
	 */
	async validateUserByUserId(id: Types.ObjectId, password: string): Promise<UserDocument | null> {
		const user = await this.usersService.findById(id);
		const valid = await this.validateUser(user, password);

		if (!user || !valid) {
			return null;
		}

		return user;
	}

	private async validateUser(user: UserDocument | null, password: string): Promise<boolean> {
		if (!user) return false;

		// Skip password authentication for demo accounts
		if (user.profile.isDemo && user.auth.password == null) {
			return true;
		}

		// Prevent timing-based attacks
		const RANDOM_STRING = 'e8a4462c2fea6008ff67b00f890';

		const passwordValid = await bcrypt.compare(password, user?.auth.password || RANDOM_STRING);

		return passwordValid;
	}

	async updateUserPassword(userId: Types.ObjectId, rawPassword: string): Promise<UserDocument> {
		const hash = await this.hashPassword(rawPassword);
		return this.usersService.findOneByIdAndUpdate(userId, { 'auth.password': hash });
	}

	async updateUserEmail(userId: Types.ObjectId, email: string): Promise<UserDocument> {
		await this.usersService.setConfirmed(userId, false);
		return this.usersService.updateEmail(userId, email);
	}

	async deleteUserAccount(userId: Types.ObjectId): Promise<UserDocument> {
		return this.usersService.delete(userId);
	}

	private hashPassword(input: string): Promise<string> {
		return bcrypt.hash(input, 12);
	}
}
