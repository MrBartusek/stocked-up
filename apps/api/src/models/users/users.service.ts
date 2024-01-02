import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { ImagesService } from '../../images/images.service';
import { GravatarService } from '../../gravatar/gravatar.service';
import { UpdateUserDto } from 'shared-types';
import { Types } from 'mongoose';

export interface UserCreateData {
	username: string;
	email: string;
	passwordHash: string;
}

@Injectable()
export class UsersService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly imagesService: ImagesService,
		private readonly gravatarService: GravatarService,
	) {}

	private readonly logger = new Logger(UsersService.name);

	async create(data: UserCreateData): Promise<UserDocument | undefined> {
		const avatarKey = await this.importDefaultAvatar(data.email);

		return this.userRepository.create({
			profile: { username: data.username, email: data.email, imageKey: avatarKey },
			auth: { password: data.passwordHash },
		});
	}

	async updateProfile(id: Types.ObjectId, dto: UpdateUserDto) {
		const { image, ...rest } = dto;

		const user = await this.userRepository.findOneByIdAndUpdate(id, { $set: { profile: rest } });
		user.profile.imageKey = await this.imagesService.handleImageDtoAndGetKey(user.profile, image);
		return await this.userRepository.findOneByIdAndUpdate(id, user);
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

	private async importDefaultAvatar(email: string): Promise<string | null> {
		const gravatar = await this.gravatarService.getGravatarBuffer(email);
		if (!gravatar) return null;
		this.logger.log(`Saving default Gravatar as avatar for new user: ${email}`);
		return this.imagesService.uploadImage(gravatar);
	}
}
