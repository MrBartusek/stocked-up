import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserRegisterDto } from 'shared-types';

describe('AuthController', () => {
	let controller: AuthController;

	const mockAuthService = {
		registerUser: jest.fn((dto: UserRegisterDto) => {
			return { _id: '123', email: dto.email, username: dto.username };
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should login', () => {
		expect(controller.login()).toEqual(
			expect.objectContaining({
				statusCode: 200,
			}),
		);
	});

	it('should logout', () => {
		const mockRequest = {
			logout: (done: (err: any) => void) => {
				done(null);
			},
		} as Request;

		expect(controller.logout(mockRequest)).resolves.toEqual(
			expect.objectContaining({
				statusCode: 200,
			}),
		);
	});

	it('should register', () => {
		expect(
			controller.register({ email: 'test@dokurno.dev', username: 'test', password: 'test' }),
		).resolves.toEqual(
			expect.objectContaining({
				statusCode: 200,
			}),
		);
	});
});
