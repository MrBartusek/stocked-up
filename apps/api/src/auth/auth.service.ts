import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';

export interface UserRegisterData {
	username: string;
	email: string;
	password: string;
}

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async registerUser(data: UserRegisterData): Promise<UserDocument> {
		const hash = await bcrypt.hash(data.password, 12);

		const isEmailTaken = await this.usersService.isEmailTaken(data.email);
		if (isEmailTaken) {
			throw new BadRequestException({ message: 'This email is already taken' });
		}

		const isUsernameTaken = await this.usersService.isUsernameTaken(data.email);
		if (isUsernameTaken) {
			throw new BadRequestException({ message: 'This username is already taken' });
		}

		return this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});
	}

	async validateUser(username: string, password: string): Promise<UserDocument> {
		const user = await this.usersService.findOne(username);

		const RANDOM_STRING = 'e8a4462c2fea6008ff67b00f890';

		const passwordValid = await bcrypt.compare(password, user?.auth.password || RANDOM_STRING);

		if (user && passwordValid) {
			return user;
		}
	}
}
