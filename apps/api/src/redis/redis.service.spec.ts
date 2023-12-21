import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';

describe('RedisService', () => {
	let service: RedisService;

	const mockClient = {
		set: jest.fn(),
	};

	const setSpy = jest.spyOn(mockClient, 'set');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RedisService, { provide: 'CLIENT', useValue: mockClient }],
		}).compile();

		service = module.get<RedisService>(RedisService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should retrieve client', async () => {
		const client = service.client;
		await client.set('test', 'test');
		expect(setSpy).toBeCalledWith('test', 'test');
	});
});
