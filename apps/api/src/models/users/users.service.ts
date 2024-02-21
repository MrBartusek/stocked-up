import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { GravatarService } from '../../gravatar/gravatar.service';
import { ImagesService } from '../../images/images.service';
import { OrganizationsAclService } from '../organizations/organizations-acl.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserRepository } from './users.repository';

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
		private readonly organizationsAclService: OrganizationsAclService,
		private readonly organizationsService: OrganizationsService,
	) {}

	private readonly logger = new Logger(UsersService.name);

	async create(data: UserCreateData): Promise<UserDocument | undefined> {
		const avatarKey = await this.importDefaultAvatar(data.email);

		const user = await this.userRepository.create({
			profile: {
				username: data.username,
				email: data.email,
				imageKey: avatarKey,
				isDemo: data.isDemo || false,
				isConfirmed: data.isConfirmed || false,
			},
			auth: { password: data.passwordHash || null },
		});

		this.logger.log(`Created new user {${user.profile.username},${user._id}}`);
		return user;
	}

	async updateProfile(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserDocument> {
		const { image, username } = dto;

		const user = await this.userRepository.findOneByIdAndUpdate(id, {
			$set: {
				'profile.username': username,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		user.profile.imageKey = await this.imagesService.handleImageDtoAndGetKey(user.profile, image);
		return await this.userRepository.findOneByIdAndUpdate(id, user);
	}

	async updateEmail(id: Types.ObjectId, email: string): Promise<UserDocument | null> {
		const user = await this.findById(id);
		if (!user) return null;

		if (user.profile.email == email) {
			throw new BadRequestException('New email address is identical to the current one');
		}

		return this.userRepository.findOneByIdAndUpdate(id, {
			$set: {
				'profile.email': email,
			},
		});
	}

	async delete(id: Types.ObjectId): Promise<UserDocument> {
		const user = await this.userRepository.deleteOneById(id);
		await this.imagesService.deleteImage(user.profile);
		await this.removeUserFromAllOrgs(id);
		this.logger.log(`Deleted user {${user.profile.username},${user._id}}`);
		return user;
	}

	findOne(username: string): Promise<UserDocument | undefined> {
		return this.userRepository.findOne({
			$or: [{ 'profile.username': username }, { 'profile.email': username }],
		});
	}

	findByEmail(email: string): Promise<UserDocument | undefined> {
		return this.userRepository.findOne({ 'profile.email': email });
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
		this.logger.log(`Saved default Gravatar as avatar for new user {${email}}`);
		return this.imagesService.uploadImage(gravatar);
	}

	private async removeUserFromAllOrgs(userId: Types.ObjectId) {
		const userOrgs = await this.organizationsService.listAllForUser(userId);
		for await (const org of userOrgs) {
			const updatedOrg = await this.organizationsAclService.deleteRule(org._id, userId);
			if (updatedOrg.acls.length == 0) {
				await this.organizationsService.delete(updatedOrg._id);
			}
		}
	}
}
