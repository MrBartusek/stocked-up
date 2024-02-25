import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AuthEmailsService } from '../auth-emails/auth-emails.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';

describe('AuthController', () => {
	let controller: AuthController;

	const mockAuthService = {
		registerUser: jest.fn((dto: UserRegisterDto) => {
			return { _id: new Types.ObjectId(), profile: dto };
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
			.compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
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
});
