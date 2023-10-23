import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/schemas/user.schema';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(username: string, password: string): Promise<User | undefined> {
		const user = await this.usersService.findOne(username);

		if (user && password == 'test') {
			return user;
		}
	}
}
