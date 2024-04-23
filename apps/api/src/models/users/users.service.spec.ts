import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { GravatarService } from '../../gravatar/gravatar.service';
import { ImagesService } from '../../images/images.service';
import { MockUserRepository } from './mocks/mock-user-repository';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	const mockUserRepository = new MockUserRepository();

	const mockImagesService = {
		uploadImage: jest.fn(() => 'key'),
		handleImageDtoAndGetKey: jest.fn(() => 'key'),
		deleteImage: jest.fn(),
	};

	const mockGravatarService = {
		getGravatarBuffer: jest.fn(),
	};

	const mockEventEmitter = {
		emit: jest.fn(),
	};

	const emitSpy = jest.spyOn(mockEventEmitter, 'emit');
	const deleteImageSpy = jest.spyOn(mockImagesService, 'deleteImage');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository,
				},
				{
					provide: ImagesService,
					useValue: mockImagesService,
				},
				{
					provide: GravatarService,
					useValue: mockGravatarService,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('should create user', () => {
		it('without gravatar', async () => {
			mockGravatarService.getGravatarBuffer.mockResolvedValue(null);

			const user = await service.create({
				username: 'test',
				email: 'test@dokurno.dev',
				passwordHash: 'test',
			});

			expect(user.profile.username).toStrictEqual('test');
			expect(user.profile.imageKey).toStrictEqual(null);
		});

		it('with gravatar', async () => {
			mockGravatarService.getGravatarBuffer.mockResolvedValue(Buffer.from('xxx'));

			const user = await service.create({
				username: 'test',
				email: 'wtest@dokurno.dev',
				passwordHash: 'test',
			});

			expect(user.profile.imageKey).toStrictEqual(expect.any(String));
		});
	});

	it('should find by username', async () => {
		const user = await service.findOne('test');

		expect(user.profile.username).toStrictEqual('test');
	});

	it('should find by id', async () => {
		const user = await service.findById(new Types.ObjectId());

		expect(user.profile.username).toStrictEqual('test');
	});

	it('should delete user', async () => {
		const user = await service.delete(new Types.ObjectId());

		expect(user.profile.username).toStrictEqual(expect.any(String));
		expect(deleteImageSpy).toHaveBeenCalledWith(
			expect.objectContaining({ imageKey: 'test-image-key' }),
		);
		expect(emitSpy).toBeCalledWith('user.deleted', expect.anything());
	});

	it('should find user by email', async () => {
		const user = await service.findByEmail('test@dokurno.dev');

		expect(user.profile.username).toStrictEqual(expect.any(String));
	});

	it('should find user', async () => {
		const users = await service.find({ username: 'test' });

		expect(users[0].profile.username).toStrictEqual(expect.any(String));
	});

	it('should check if email is taken', async () => {
		const taken = await service.isEmailTaken('test@dokurno.dev');
		expect(taken).toBe(true);
	});

	it('should check if username is taken', async () => {
		const taken = await service.isUsernameTaken('test');
		expect(taken).toBe(true);
	});

	it('should activate account', async () => {
		const user = await service.setConfirmed(new Types.ObjectId(), true);
		expect(user.profile.username).toStrictEqual(expect.any(String));
	});

	it('should check if exist', async () => {
		const exist = await service.exist(new Types.ObjectId());
		expect(exist).toBe(true);
	});

	it('should find one by id and update', async () => {
		const user = await service.findOneByIdAndUpdate(new Types.ObjectId(), { username: 'test' });
		expect(user.profile.username).toStrictEqual(expect.any(String));
	});
});
