import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, UserRegisterData } from './auth.service';
import { UsersService } from '../models/users/users.service';
import * as bcrypt from 'bcrypt';
import exp from 'constants';
import { BadRequestException } from '@nestjs/common';

const MOCK_PASSWORD = 'test-password';

describe('AuthService', () => {
	let service: AuthService;

	let mockPassword: string;
	let mockPasswordHashed: string;

	const mockAuthService = {
		isEmailTaken: jest.fn((email: string) => {
			return email == 'taken@dokurno.dev';
		}),
		isUsernameTaken: jest.fn((username: string) => {
			return username == 'taken';
		}),
		findOne: jest.fn((username: string) => {
			if (username != 'taken') return null;
			return {
				profile: {
					email: 'test@dokurno.dev',
					username: username,
				},
				auth: {
					password: mockPasswordHashed,
				},
			};
		}),

		create: jest.fn((data: UserRegisterData) => {
			return {
				profile: {
					email: data.email,
					username: data.username,
				},
				auth: {
					password: mockPasswordHashed,
				},
			};
		}),
	};

	beforeAll(async () => {
		mockPassword = MOCK_PASSWORD;
		mockPasswordHashed = await bcrypt.hash(mockPassword, 4);
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('User registration', () => {
		it('should register user', () => {
			expect(
				service.registerUser({
					email: 'test@dokurno.dev',
					username: 'username',
					password: 'password',
				}),
			).resolves.toEqual(
				expect.objectContaining({ profile: expect.objectContaining({ username: 'username' }) }),
			);
		});

		it('should not register user with taken username', () => {
			const t = () =>
				service.registerUser({
					email: 'test@dokurno.dev',
					username: 'taken',
					password: 'password',
				});
			expect(t).rejects.toThrow(BadRequestException);
			expect(t).rejects.toThrow('username');
		});

		it('should not register user with taken email', () => {
			const t = () =>
				service.registerUser({
					email: 'taken@dokurno.dev',
					username: 'username',
					password: 'password',
				});
			expect(t).rejects.toThrow(BadRequestException);
			expect(t).rejects.toThrow('email');
		});
	});

	describe('User validation', () => {
		it('should validate a valid user', () => {
			expect(service.validateUser('taken', mockPassword)).resolves.toEqual(
				expect.objectContaining({ profile: expect.objectContaining({ username: 'taken' }) }),
			);
		});

		it('should not validate user that does not exist', () => {
			expect(service.validateUser('doesnt-exist', mockPassword)).resolves.toBe(undefined);
		});

		it('should not validate user with invalid password', () => {
			expect(service.validateUser('taken', 'invalid')).resolves.toBe(undefined);
		});
	});
});
