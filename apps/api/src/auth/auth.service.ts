import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async registerUser(data: UserRegisterDto): Promise<UserDocument> {
		const hash = await bcrypt.hash(data.password, 12);

		return this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});
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
}
