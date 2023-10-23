import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UserRepository) {}

	findOne(username: string): Promise<UserDocument | undefined> {
		return this.userRepository.findOne({ profile: { username } });
	}

	findById(id: string): Promise<UserDocument | undefined> {
		return this.userRepository.findById(id);
	}
}
