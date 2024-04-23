import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { MockUserRepository } from '../models/users/mocks/mock-user-repository';
import { UsersService } from '../models/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	const mockUserRepository = new MockUserRepository();

	const mockUsersService = {
		findOne: jest.fn(),
		findById: jest.fn(),
		findOneByIdAndUpdate: jest.fn(),
		setConfirmed: jest.fn(),
		delete: jest.fn((id) => mockUserRepository.deleteOneById(id)),
		updateEmail: jest.fn(async (id, email) => {
			const user = await mockUserRepository.findOne();
			return {
				...user,
				_id: id,
				profile: {
					...user.profile,
					email,
				},
			};
		}),
		create: jest.fn((data) => {
			return {
				_id: new Types.ObjectId(),
				profile: {
					email: data.email,
					username: data.username,
				},
				auth: {
					password: 'password',
				},
			};
		}),
	};

	const userUpdateSpy = jest.spyOn(mockUsersService, 'findOneByIdAndUpdate');
	const userSetConfirmedSpy = jest.spyOn(mockUsersService, 'setConfirmed');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should register user', async () => {
		const user = await service.registerUser({
			email: 'test@dokurno.dev',
			username: 'username',
			password: 'password',
		});
		expect(user).toEqual(
			expect.objectContaining({ profile: expect.objectContaining({ username: 'username' }) }),
		);
	});

	describe('validateUserByUsername', () => {
		it('should validate a valid user', async () => {
			const password = 'password';
			const hashed = await bcrypt.hash(password, 4);

			mockUsersService.findOne.mockResolvedValue({
				profile: {
					username: 'test',
				},
				auth: {
					password: hashed,
				},
			});

			expect(service.validateUserByUsername('test', password)).resolves.toEqual(
				expect.objectContaining({ profile: expect.objectContaining({ username: 'test' }) }),
			);
		});

		it('should not validate a user that does not exist', async () => {
			mockUsersService.findOne.mockResolvedValue(null);

			expect(service.validateUserByUsername('test', 'password')).resolves.toBeNull();
		});

		it('should not validate a user with invalid credentials', async () => {
			const invalidPassword = 'other-password';
			const hashedValidPassword = await bcrypt.hash('password', 4);

			mockUsersService.findOne.mockResolvedValue({
				profile: {
					username: 'test',
				},
				auth: {
					password: hashedValidPassword,
				},
			});

			expect(service.validateUserByUsername('test', invalidPassword)).resolves.toBeNull();
		});
	});

	describe('validateUserByUserId', () => {
		it('should validate a valid user', async () => {
			const password = 'password';
			const hashed = await bcrypt.hash(password, 4);

			mockUsersService.findById.mockResolvedValue({
				profile: {
					username: 'test',
				},
				auth: {
					password: hashed,
				},
			});

			expect(service.validateUserByUserId(new Types.ObjectId(), password)).resolves.toEqual(
				expect.objectContaining({ profile: expect.objectContaining({ username: 'test' }) }),
			);
		});

		it('should not validate a user that does not exist', async () => {
			mockUsersService.findById.mockResolvedValue(null);

			const result = await service.validateUserByUserId(new Types.ObjectId(), 'password');

			expect(result).toBeNull();
		});

		it('should not validate a user with invalid credentials', async () => {
			const invalidPassword = 'other-password';
			const hashedValidPassword = await bcrypt.hash('password', 4);
			mockUsersService.findById.mockResolvedValue({
				profile: {
					username: 'test',
				},
				auth: {
					password: hashedValidPassword,
				},
			});

			const result = await service.validateUserByUserId(new Types.ObjectId(), invalidPassword);

			expect(result).toBeNull();
		});
	});

	describe('updateUserPassword', () => {
		it('should update user password', async () => {
			const userId = new Types.ObjectId();
			const hash = await bcrypt.hash('password', 4);

			await service.updateUserPassword(userId, hash);

			expect(userUpdateSpy).toBeCalledTimes(1);
			expect(userUpdateSpy).toBeCalledWith(userId, { 'auth.password': expect.any(String) });
		});
	});

	it('should update email', async () => {
		const userId = new Types.ObjectId();

		const user = await service.updateUserEmail(userId, 'changed@dokurno.dev');

		expect(userSetConfirmedSpy).toBeCalledWith(userId, false);
		expect(user.profile.email).toBe('changed@dokurno.dev');
	});

	it('should delete user', async () => {
		const userId = new Types.ObjectId();
		const user = await service.deleteUserAccount(userId);
		expect(user._id).toBe(userId);
	});
});
