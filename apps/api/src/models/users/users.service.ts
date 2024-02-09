import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { GravatarService } from '../../gravatar/gravatar.service';
import { ImagesService } from '../../images/images.service';
import { CryptoUtils } from '../../security/helpers/crypto.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { UpdateQuery } from 'mongoose';

export interface UserCreateData {
	username: string;
	email: string;
	passwordHash?: string;
	isDemo?: boolean;
	isConfirmed?: boolean;
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
			profile: {
				username: data.username,
				email: data.email,
				imageKey: avatarKey,
				isDemo: data.isDemo || false,
				isConfirmed: data.isConfirmed || false,
			},
			auth: { password: data.passwordHash || null },
		});
	}

	async updateProfile(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserDocument> {
		const { image, username, email } = dto;

		const user = await this.userRepository.findOneByIdAndUpdate(id, {
			$set: {
				'profile.username': username,
				'profile.email': email,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		user.profile.imageKey = await this.imagesService.handleImageDtoAndGetKey(user.profile, image);
		return await this.userRepository.findOneByIdAndUpdate(id, user);
	}

	async delete(id: Types.ObjectId): Promise<UserDocument> {
		const user = await this.userRepository.deleteOneById(id);
		this.imagesService.deleteImage(user.profile);
		return user;
	}

	findOne(username: string): Promise<UserDocument | undefined> {
		return this.userRepository.findOne({
			$or: [{ 'profile.username': username }, { 'profile.email': username }],
		});
	}

	find(entityFilterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
		return this.userRepository.find(entityFilterQuery);
	}

	findById(id: Types.ObjectId): Promise<UserDocument | null> {
		return this.userRepository.findById(id);
	}

	findOneByIdAndUpdate(
		id: Types.ObjectId,
		query: UpdateQuery<UserDocument>,
	): Promise<UserDocument | null> {
		return this.userRepository.findOneByIdAndUpdate(id, query);
	}

	isEmailTaken(email: string) {
		return this.userRepository.exist({ 'profile.email': email });
	}

	isUsernameTaken(username: string) {
		return this.userRepository.exist({ 'profile.username': username });
	}

	exist(id: Types.ObjectId) {
		return this.userRepository.exist({ _id: id });
	}

	setConfirmed(id: Types.ObjectId, isConfirmed: boolean) {
		return this.userRepository.findOneByIdAndUpdate(id, { 'profile.isConfirmed': isConfirmed });
	}

	private async importDefaultAvatar(email: string): Promise<string | null> {
		const gravatar = await this.gravatarService.getGravatarBuffer(email);
		if (!gravatar) return null;
		this.logger.log(`Saving default Gravatar as avatar for new user: ${email}`);
		return this.imagesService.uploadImage(gravatar);
	}
}
