import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { EmailsService } from '../emails/emails.service';
import { UsersTokenService } from '../models/users/users-token.service';
import { UsersService } from '../models/users/users.service';
import { AuthEmailsService } from './auth-emails.service';

describe('AuthEmailsService', () => {
	let service: AuthEmailsService;

	const mockUsersService = {
		setConfirmed: jest.fn(),
		findById: jest.fn(),
		findByEmail: jest.fn(),
	};

	const mockUsersTokenService = {
		generateAndSaveToken: jest.fn(() => 'TEST_TOKEN'),
		validateToken: jest.fn(),
		invalidateToken: jest.fn(),
		getLastRetry: jest.fn(),
	};
	const mockEmailService = {
		sendEmail: jest.fn(() => 'email-id'),
	};
	const mockAuthService = {
		updateUserPassword: jest.fn(),
	};

	const sendEmailSpy = jest.spyOn(mockEmailService, 'sendEmail');
	const invalidateTokenSpy = jest.spyOn(mockUsersTokenService, 'invalidateToken');
	const setConfirmedSpy = jest.spyOn(mockUsersService, 'setConfirmed');
	const updatePasswordSpy = jest.spyOn(mockAuthService, 'updateUserPassword');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthEmailsService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: UsersTokenService,
					useValue: mockUsersTokenService,
				},
				{
					provide: EmailsService,
					useValue: mockEmailService,
				},
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		service = module.get<AuthEmailsService>(AuthEmailsService);
	});

	afterEach(() => jest.clearAllMocks());

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('sendEmailConfirmation', () => {
		it('should fail if user does not exist', () => {
			mockUsersService.findById.mockResolvedValue(null);

			expect(service.sendEmailConfirmation(new Types.ObjectId())).rejects.toThrowError(
				NotFoundException,
			);
		});

		it('should fail on confirmed email', () => {
			mockUsersService.findById.mockResolvedValue({ profile: { isConfirmed: true } });

			expect(service.sendEmailConfirmation(new Types.ObjectId())).rejects.toThrowError(
				'This user E-mail address is already confirmed',
			);
		});

		it('should send email confirmation', async () => {
			const user = {
				_id: new Types.ObjectId(),
				profile: {
					isConfirmed: false,
					username: 'test',
					email: 'test@dokurno.dev',
				},
			};
			mockUsersService.findById.mockResolvedValue(user);

			const emailId = await service.sendEmailConfirmation(new Types.ObjectId());

			expect(emailId).toBe('email-id');
			expect(sendEmailSpy).toHaveBeenCalledTimes(1);
			expect(sendEmailSpy).toHaveBeenCalledWith(
				expect.objectContaining({
					to: 'test@dokurno.dev',
					subject: '[StockedUp] Confirm E-mail address',
					text: expect.stringContaining('TEST_TOKEN'),
				}),
			);
		});
	});

	describe('sendPasswordResetEmail', () => {
		it('should fail on invalid email', () => {
			mockUsersService.findByEmail.mockResolvedValue(null);

			expect(service.sendPasswordResetEmail('invalid@dokurno.dev')).rejects.toThrowError(
				NotFoundException,
			);
		});

		it('should send password reset email', async () => {
			const user = {
				_id: new Types.ObjectId(),
				profile: {
					isConfirmed: true,
					username: 'test',
					email: 'test@dokurno.dev',
				},
			};
			mockUsersService.findByEmail.mockResolvedValue(user);

			const emailId = await service.sendPasswordResetEmail('test@dokurno.dev');

			expect(emailId).toBe('email-id');
			expect(sendEmailSpy).toHaveBeenCalledTimes(1);
			expect(sendEmailSpy).toHaveBeenCalledWith(
				expect.objectContaining({
					to: 'test@dokurno.dev',
					subject: '[StockedUp] Password reset request',
					text: expect.stringContaining('TEST_TOKEN'),
				}),
			);
		});
	});

	describe('confirmEmailWithToken', () => {
		it('should fail on invalid token', () => {
			mockUsersTokenService.validateToken.mockResolvedValue(false);

			expect(
				service.confirmEmailWithToken(new Types.ObjectId(), 'EMAIL_TOKEN'),
			).rejects.toThrowError(BadRequestException);
		});

		it('should confirm email on valid token', async () => {
			const userId = new Types.ObjectId();
			mockUsersTokenService.validateToken.mockResolvedValue(true);

			await service.confirmEmailWithToken(userId, 'EMAIL_TOKEN');

			expect(invalidateTokenSpy).toHaveBeenCalledWith(userId, 'EMAIL_TOKEN');
			expect(setConfirmedSpy).toBeCalledWith(userId, true);
		});
	});

	describe('resetPasswordWithToken', () => {
		it('should fail on invalid token', () => {
			mockUsersTokenService.validateToken.mockResolvedValue(false);

			expect(
				service.resetPasswordWithToken(new Types.ObjectId(), 'EMAIL_TOKEN', 'password'),
			).rejects.toThrowError(BadRequestException);
		});

		it('should confirm email on valid token', async () => {
			const userId = new Types.ObjectId();
			mockUsersTokenService.validateToken.mockResolvedValue(true);

			await service.resetPasswordWithToken(userId, 'EMAIL_TOKEN', 'password');

			expect(invalidateTokenSpy).toHaveBeenCalledWith(userId, 'EMAIL_TOKEN');
			expect(setConfirmedSpy).toBeCalledWith(userId, true);
			expect(updatePasswordSpy).toBeCalledWith(userId, 'password');
		});
	});

	describe('Throttling', () => {
		it('should throttle requests', () => {
			mockUsersService.findById.mockResolvedValue({ profile: { isConfirmed: false } });
			mockUsersTokenService.getLastRetry.mockResolvedValue(new Date());

			expect(service.sendEmailConfirmation(new Types.ObjectId())).rejects.toThrowError(
				'The confirmation email was sent recently, please check your inbox',
			);
		});
	});
});
