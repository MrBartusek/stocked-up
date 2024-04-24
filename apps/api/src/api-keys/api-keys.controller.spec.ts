import { Test, TestingModule } from '@nestjs/testing';
import { mockUserRequest } from '../mocks/mock-user-request';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';

describe('ApiKeysController', () => {
	let controller: ApiKeysController;

	const mockKeysService = {
		getKeyForUser: jest.fn((user) => ({
			user,
			apiKey: `${user}.KEY`,
		})),
		regenerateKeyForUser: jest.fn((user) => ({
			user,
			apiKey: `${user}.KEY`,
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ApiKeysController],
			providers: [ApiKeysService],
		})
			.overrideProvider(ApiKeysService)
			.useValue(mockKeysService)
			.compile();

		controller = module.get<ApiKeysController>(ApiKeysController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should get api key', async () => {
		const request = mockUserRequest;

		const keyDto = await controller.get(request);

		expect(keyDto.user).toStrictEqual(request.user.id);
		expect(keyDto.apiKey.startsWith(request.user.id)).toBe(true);
	});

	it('should regenerate api key', async () => {
		const request = mockUserRequest;

		const keyDto = await controller.regenerate(request);

		expect(keyDto.user).toStrictEqual(request.user.id);
		expect(keyDto.apiKey.startsWith(request.user.id)).toBe(true);
	});
});
