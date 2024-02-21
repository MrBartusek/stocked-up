import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { Types } from 'mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
	let controller: UsersController;

	const mockUserService = {
		findById: jest.fn((id) => {
			return {
				_id: id,
				profile: {
					username: 'test-user',
					email: 'test@dokurno.dev',
				},
				auth: {
					password: 'test',
				},
			};
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService],
		})
			.overrideProvider(UsersService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should get user by id', () => {
		expect(controller.findOne(new Types.ObjectId())).resolves.toEqual({
			id: expect.any(Types.ObjectId),
			username: expect.any(String),
			image: {
				hasImage: expect.any(Boolean),
				url: expect.any(String),
			},
		});
	});

	it('should get authenticated user', () => {
		const mockRequest = { user: { id: new Types.ObjectId().toString() } } as Request;

		expect(controller.findAuthenticated(mockRequest)).resolves.toEqual({
			id: expect.any(Types.ObjectId),
			username: expect.any(String),
			email: expect.any(String),
			image: {
				hasImage: expect.any(Boolean),
				url: expect.any(String),
			},
		});
	});
});
