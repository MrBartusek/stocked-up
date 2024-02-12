import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { DemoService } from '../demo/demo.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthEmailsService } from '../auth-emails/auth-emails.service';

describe('AuthController', () => {
	let controller: AuthController;

	const mockAuthService = {
		registerUser: jest.fn((dto: UserRegisterDto) => {
			return { _id: new Types.ObjectId(), profile: dto };
		}),
	};

	const mockDemoService = {
		setupDemoAccount: jest.fn(() => {
			return {
				_id: new Types.ObjectId(),
				profile: { email: 'demo@dokurno.dev', username: 'demo' },
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
			providers: [AuthService, DemoService, AuthEmailsService],
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.overrideProvider(DemoService)
			.useValue(mockDemoService)
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

	it('should create demo account', async () => {
		const user = await controller.createDemo();

		expect(user.username).toBe('demo');
	});
});
