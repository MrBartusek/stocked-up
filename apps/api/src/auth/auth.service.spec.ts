import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../models/users/users.service';
import { AuthService } from './auth.service';
import { AuthEmailsService } from '../auth-emails/auth-emails.service';
import { Types } from 'mongoose';

const MOCK_PASSWORD = 'test-password';

describe('AuthService', () => {
	let service: AuthService;

	let mockPassword: string;
	let mockPasswordHashed: string;

	const mockAuthService = {
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

		create: jest.fn((data) => {
			return {
				_id: new Types.ObjectId(),
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

	const mockAuthEmailService = {
		sendEmailConfirmation: jest.fn(() => Promise.resolve()),
	};

	const sendEmailConfirmationSpy = jest.spyOn(mockAuthEmailService, 'sendEmailConfirmation');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockAuthService,
				},
				{
					provide: AuthEmailsService,
					useValue: mockAuthEmailService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	beforeAll(async () => {
		mockPassword = MOCK_PASSWORD;
		mockPasswordHashed = await bcrypt.hash(mockPassword, 4);
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
		expect(sendEmailConfirmationSpy).toBeCalledTimes(1);
		expect(sendEmailConfirmationSpy).toBeCalledWith(user._id);
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
