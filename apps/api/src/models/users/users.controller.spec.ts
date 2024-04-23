import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { mockUserRequest } from '../../mocks/mock-user-request';
import { UpdateUserDto } from './dto/update-user.dto';
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
		updateProfile: jest.fn((id, dto) => {
			return {
				_id: id,
				profile: dto,
			};
		}),
		isUsernameTaken: jest.fn(),
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
		const user = controller.findOne(new Types.ObjectId());

		expect(user).resolves.toEqual({
			id: expect.any(Types.ObjectId),
			username: expect.any(String),
			image: {
				hasImage: expect.any(Boolean),
				url: expect.any(String),
			},
		});
	});

	it('should get authenticated user', async () => {
		const request = mockUserRequest;

		const user = await controller.findAuthenticated(request);

		expect(user).toEqual({
			id: expect.any(Types.ObjectId),
			username: expect.any(String),
			email: expect.any(String),
			image: {
				hasImage: expect.any(Boolean),
				url: expect.any(String),
			},
		});
	});

	describe('Update profile', () => {
		it('should update profile', async () => {
			const request = mockUserRequest;
			mockUserService.isUsernameTaken.mockResolvedValue(false);

			const dto: UpdateUserDto = {
				username: 'updated',
				image: { hasImage: false },
			};
			const user = await controller.updateProfile(request, dto);

			expect(user).toStrictEqual(
				expect.objectContaining({
					username: 'updated',
				}),
			);
		});

		it('should error on taken username', async () => {
			const request = mockUserRequest;
			mockUserService.isUsernameTaken.mockResolvedValue(true);

			const dto: UpdateUserDto = {
				username: 'updated',
				image: { hasImage: false },
			};
			const user = controller.updateProfile(request, dto);

			expect(user).rejects.toThrowError(BadRequestException);
		});
	});
});
