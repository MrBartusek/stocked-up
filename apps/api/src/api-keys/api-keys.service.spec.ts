import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeysService } from './api-keys.service';
import { UserRepository } from '../models/users/users.repository';
import { Types } from 'mongoose';

describe('ApiKeysService', () => {
	let service: ApiKeysService;

	const mockUserRepository = {
		findById: jest.fn(),
		findOneAndUpdate: jest.fn((id, query) => ({
			_id: id,
			auth: {
				password: 'password',
				apiKey: query['auth.apiKey'],
			},
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ApiKeysService,
				{
					provide: UserRepository,
					useValue: mockUserRepository,
				},
			],
		}).compile();

		service = module.get<ApiKeysService>(ApiKeysService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should generate new key', async () => {
		const userId = new Types.ObjectId();
		mockUserRepository.findById.mockResolvedValue({
			auth: {
				password: 'password',
				apiKey: null,
			},
		});
		const dto = await service.getKeyForUser(userId);

		expect(dto.user).toEqual(userId.toString());
		const [user, realKey] = dto.apiKey.split('.');
		expect(user).toEqual(userId.toString());
		expect(realKey).toHaveLength(64);
	});

	it('should retrieve current key', async () => {
		const userId = new Types.ObjectId();
		mockUserRepository.findById.mockResolvedValue({
			auth: {
				password: 'password',
				apiKey: `${userId}.current-key`,
			},
		});
		const dto = await service.getKeyForUser(userId);

		expect(dto.user).toEqual(userId.toString());
		expect(dto.apiKey).toEqual(`${userId}.current-key`);
	});

	it('should regenerate key', async () => {
		const userId = new Types.ObjectId();
		const dto = await service.regenerateKeyForUser(userId);

		expect(dto.user).toEqual(userId.toString());
		expect(mockUserRepository.findOneAndUpdate).toBeCalledWith(userId, {
			'auth.apiKey': dto.apiKey,
		});
		const [user] = dto.apiKey.split('.');
		expect(user).toEqual(userId.toString());
	});
});
