import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UsersService } from '../models/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	const mockUsersService = {
		findOne: jest.fn(),
		findById: jest.fn(),
		findOneByIdAndUpdate: jest.fn(),
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

			expect(service.validateUserByUsername('test', 'password')).rejects.toThrowError(
				BadRequestException,
			);
		});

		it('should validate a user with invalid credentials', async () => {
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

			expect(service.validateUserByUsername('test', invalidPassword)).rejects.toThrowError(
				BadRequestException,
			);
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
});
