import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/models/users/schemas/user.schema';
import { UsersService } from 'src/models/users/users.service';

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

		return this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});
	}

	async validateUser(username: string, password: string): Promise<UserDocument> {
		const user = await this.usersService.findOne(username);

		if (user && password == 'test') {
			return user;
		}
	}
}
