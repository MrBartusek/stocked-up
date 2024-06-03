import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AuthEmailsService } from '../auth-emails/auth-emails.service';
import { mockUserRequest } from '../mocks/mock-user-request';
import { MockUserRepository } from '../models/users/mocks/mock-user-repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { NotOrgOwnerGuard } from '../models/users/guards/org-owner.guard';
import { MockGuard } from '../mocks/mock.guard';

describe('AuthController', () => {
	let controller: AuthController;

	const mockUserRepo = new MockUserRepository();

	const mockAuthService = {
		registerUser: jest.fn((dto: UserRegisterDto) => {
			return { _id: new Types.ObjectId(), profile: dto };
		}),
		validateUserByUserId: jest.fn(() => mockUserRepo.findOne()),
		updateUserPassword: jest.fn(),
		deleteUserAccount: jest.fn(),
		updateUserEmail: jest.fn(async (id, email) => {
			const user = await mockUserRepo.findOne();
			return {
				...user,
				_id: id,
				profile: {
					...user.profile,
					email,
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
			controllers: [AuthController],
			providers: [AuthService, AuthEmailsService],
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.overrideProvider(AuthEmailsService)
			.useValue(mockAuthEmailService)
			.overrideGuard(NotOrgOwnerGuard)
			.useValue(MockGuard)
			.compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should login', async () => {
		const result = await controller.login();
		expect(result.statusCode).toBe(200);
	});

	describe('Logout', () => {
		it('should logout successfully', async () => {
			const request = Object.assign({}, mockUserRequest);
			request.logout = jest.fn((done) => done(null)) as any;

			const result = await controller.logout(request);
			expect(result.statusCode).toBe(200);
		});

		it('should handle error', async () => {
			const request = Object.assign({}, mockUserRequest);
			request.logout = jest.fn((done) => done('error')) as any;

			const result = controller.logout(request);
			expect(result).rejects.toThrowError(BadRequestException);
		});
	});

	it('should register', async () => {
		const user = await controller.register({
			email: 'test@dokurno.dev',
			username: 'test',
			password: 'test',
		});
		expect(user).toEqual(
			expect.objectContaining({
				email: 'test@dokurno.dev',
			}),
		);

		expect(sendEmailConfirmationSpy).toBeCalledTimes(1);
		expect(sendEmailConfirmationSpy).toBeCalledWith(user.id);
	});

	describe('Change password', () => {
		it('should change password with valid credentials', async () => {
			const user = await mockUserRepo.findOne();
			mockAuthService.validateUserByUserId.mockResolvedValue(user);

			const dto: ChangePasswordDto = {
				oldPassword: 'old',
				newPassword: 'new',
			};
			const result = await controller.changePassword(mockUserRequest, dto);

			expect(result.username).toBe(user.profile.username);
		});

		it('should throw on invalid credentials', async () => {
			mockAuthService.validateUserByUserId.mockResolvedValue(null);

			const dto: ChangePasswordDto = {
				oldPassword: 'old',
				newPassword: 'new',
			};
			const result = controller.changePassword(mockUserRequest, dto);

			expect(result).rejects.toThrowError(BadRequestException);
		});
	});

	describe('Change E-mail', () => {
		it('should change email with valid credentials', async () => {
			const user = await mockUserRepo.findOne();
			mockAuthService.validateUserByUserId.mockResolvedValue(user);

			const dto: UpdateEmailDto = {
				password: 'test',
				email: 'changed@dokurno.dev',
			};
			const result = await controller.changeEmail(mockUserRequest, dto);

			expect(result.email).toBe('changed@dokurno.dev');
		});

		it('should throw on invalid credentials', async () => {
			mockAuthService.validateUserByUserId.mockResolvedValue(null);

			const dto: UpdateEmailDto = {
				password: 'test',
				email: 'changed@dokurno.dev',
			};
			const result = controller.changeEmail(mockUserRequest, dto);

			expect(result).rejects.toThrowError(BadRequestException);
		});
	});

	describe('Delete account', () => {
		it('should delete account with valid credentials', async () => {
			const user = await mockUserRepo.findOne();
			mockAuthService.validateUserByUserId.mockResolvedValue(user);

			const dto: DeleteAccountDto = { password: 'test' };
			const result = await controller.deleteAccount(mockUserRequest, dto);

			expect(result.statusCode).toBe(200);
		});

		it('should throw on invalid credentials', async () => {
			mockAuthService.validateUserByUserId.mockResolvedValue(null);

			const dto: DeleteAccountDto = { password: 'test' };
			const result = controller.deleteAccount(mockUserRequest, dto);

			expect(result).rejects.toThrowError(BadRequestException);
		});
	});
});
