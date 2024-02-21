import { Test, TestingModule } from '@nestjs/testing';
import { addDays } from 'date-fns';
import { Types } from 'mongoose';
import { UsersTokenService } from './users-token.service';
import { UsersService } from './users.service';

describe('UsersTokenService', () => {
	let service: UsersTokenService;

	const mockUsersService = {
		findById: jest.fn(),
		findOneByIdAndUpdate: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersTokenService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		service = module.get<UsersTokenService>(UsersTokenService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('generateAndSaveToken', () => {
		it('should generate and save token', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const expireHours = 10;
			const user = {
				_id: userId,
				tokens: [],
			};
			mockUsersService.findById.mockResolvedValue(user);

			const generatedToken = await service.generateAndSaveToken({ userId, type, expireHours });

			expect(generatedToken).toStrictEqual(expect.any(String));
			expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
			expect(mockUsersService.findOneByIdAndUpdate).toHaveBeenCalledWith(userId, {
				tokens: [
					{
						type,
						token: generatedToken,
						expireAt: expect.any(Date),
						lastRetry: expect.any(Date),
					},
				],
			});
		});

		it('should return null if user not found', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';

			mockUsersService.findById.mockResolvedValue(null);

			await expect(service.generateAndSaveToken({ userId, type })).resolves.toBeNull();
		});
	});

	describe('getLastRetry', () => {
		it('should get last retry date', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const lastRetry = new Date();
			const user = {
				_id: userId,
				tokens: [{ type, lastRetry }],
			};
			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.getLastRetry(userId, type)).resolves.toEqual(lastRetry);
		});

		it('should return null if user not found', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			mockUsersService.findById.mockResolvedValue(null);

			await expect(service.getLastRetry(userId, type)).resolves.toBeNull();
		});

		it('should return null if token not found', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const user = {
				_id: userId,
				tokens: [],
			};

			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.getLastRetry(userId, type)).resolves.toBeNull();
		});
	});

	describe('validateToken', () => {
		it('should validate valid token', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const token = 'test-token';
			const user = {
				_id: userId,
				tokens: [{ type, token }],
			};
			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.validateToken({ userId, type, token })).resolves.toBe(true);
		});

		it('should not validate missing token', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const token = 'test-token';
			const user = {
				_id: userId,
				tokens: [],
			};
			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.validateToken({ userId, type, token })).resolves.toBe(false);
		});

		it('should not validate invalid token type', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const token = 'test-token';
			const user = {
				_id: userId,
				tokens: [{ type: 'other', token }],
			};
			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.validateToken({ userId, type, token })).resolves.toBe(false);
		});

		it('should not validate expired token', async () => {
			const userId = new Types.ObjectId();
			const type = 'test';
			const token = 'test-token';
			const expireAt = addDays(new Date(), -1);
			const user = {
				_id: userId,
				tokens: [{ type, token, expireAt }],
			};
			mockUsersService.findById.mockResolvedValue(user);

			await expect(service.validateToken({ userId, type, token })).resolves.toBe(false);
		});
	});
});
