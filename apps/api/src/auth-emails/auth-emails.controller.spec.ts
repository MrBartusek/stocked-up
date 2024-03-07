import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { IResetPasswordDto } from 'shared-types';
import { mockUserRequest } from '../mocks/mock-user-request';
import { AuthEmailsController } from './auth-emails.controller';
import { AuthEmailsService } from './auth-emails.service';

describe('AuthEmailsController', () => {
	let controller: AuthEmailsController;

	const mockAuthEmailsService = {
		sendEmailConfirmation: jest.fn(),
		sendPasswordResetEmail: jest.fn(),
		confirmEmailWithToken: jest.fn(),
		resetPasswordWithToken: jest.fn(),
	};

	const sendEmailConfirmationSpy = jest.spyOn(mockAuthEmailsService, 'sendEmailConfirmation');
	const sendPasswordResetEmailSpy = jest.spyOn(mockAuthEmailsService, 'sendPasswordResetEmail');
	const confirmEmailWithTokenSpy = jest.spyOn(mockAuthEmailsService, 'confirmEmailWithToken');
	const resetPasswordWithTokenSpy = jest.spyOn(mockAuthEmailsService, 'resetPasswordWithToken');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthEmailsController],
			providers: [AuthEmailsService],
		})
			.overrideProvider(AuthEmailsService)
			.useValue(mockAuthEmailsService)
			.compile();

		controller = module.get<AuthEmailsController>(AuthEmailsController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should start email confirmation', async () => {
		await controller.startEmailConfirmation(mockUserRequest);
		expect(sendEmailConfirmationSpy).toBeCalledWith(expect.any(Types.ObjectId));
	});

	it('should confirm email', async () => {
		const userId = new Types.ObjectId();
		await controller.confirmEmail(userId, 'TOKEN');
		expect(confirmEmailWithTokenSpy).toBeCalledWith(userId, 'TOKEN');
	});

	it('should password reset', async () => {
		await controller.startPasswordReset('test@dokurno.dev');
		expect(sendPasswordResetEmailSpy).toBeCalledWith('test@dokurno.dev');
	});

	it('should reset password', async () => {
		const userId = new Types.ObjectId();
		const dto: IResetPasswordDto = {
			user: userId.toString(),
			token: 'TOKEN',
			password: 'password',
		};

		await controller.resetPassword(dto);

		expect(resetPasswordWithTokenSpy).toBeCalledWith(userId, 'TOKEN', 'password');
	});
});
