import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';

export interface UserCreateData {
	username: string;
	email: string;
	passwordHash: string;
}

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	create(data: UserCreateData): Promise<UserDocument | undefined> {
		return this.userRepository.create({
			profile: { username: data.username, email: data.email, imageKey: null },
			auth: { password: data.passwordHash },
		});
	}

	findOne(username: string): Promise<UserDocument | undefined> {
		return this.userRepository.findOne({ 'profile.username': username });
	}

	findById(id: string): Promise<UserDocument | undefined> {
		return this.userRepository.findById(id);
	}

	isEmailTaken(email: string) {
		return this.userRepository.exist({ 'profile.email': email });
	}

	isUsernameTaken(username: string) {
		return this.userRepository.exist({ 'profile.username': username });
	}
}
