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

	async validateUser(username: string, password: string): Promise<UserDocument> {
		const user = await this.usersService.findOne(username);

		if (user && user.profile.isDemo && user.auth.password == null) {
			return user;
		}

		const RANDOM_STRING = 'e8a4462c2fea6008ff67b00f890';

		const passwordValid = await bcrypt.compare(password, user?.auth.password || RANDOM_STRING);

		if (user && passwordValid) {
			return user;
		}
	}

	async updateUserPassword(userId: Types.ObjectId, rawPassword: string): Promise<UserDocument> {
		const hash = this.hashPassword(rawPassword);
		return this.usersService.findOneByIdAndUpdate(userId, { 'profile.password': hash });
	}

	private hashPassword(input: string): Promise<string> {
		return bcrypt.hash(input, 12);
	}
}
