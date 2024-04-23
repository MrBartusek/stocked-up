import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis-mock';
import { Readable } from 'stream';
import Utils from '../helpers/utils';
import { RedisService } from '../redis/redis.service';
import { S3Service } from '../s3/s3.service';
import { S3CacheService, S3_CACHE_REDIS_PREFIX } from './s3-cache.service';

describe('S3CacheService', () => {
	let service: S3CacheService;

	const s3ServiceMock = {
		getObjectBody: jest.fn(() => Readable.from(Buffer.from('object'))),
	};

	const redisMock = new Redis();
	const redisService = {
		client: redisMock,
	};

	const getObjectBodyMock = jest.spyOn(s3ServiceMock, 'getObjectBody');
	const redisSetSpy = jest.spyOn(redisService.client, 'set');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				S3CacheService,
				{
					provide: S3Service,
					useValue: s3ServiceMock,
				},
				{
					provide: RedisService,
					useValue: redisService,
				},
			],
		}).compile();
		service = module.get<S3CacheService>(S3CacheService);
	});

	afterAll(() => {
		jest.clearAllMocks();
		redisService.client.flushall();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get object if cached', async () => {
		const mockObject = Buffer.from('object');
		redisService.client.set(generateRedisKey('old-key'), mockObject);

		const object = await service.getObject('old-key');

		expect(Utils.streamToBuffer(object)).resolves.toEqual(mockObject);
		expect(getObjectBodyMock).toHaveBeenCalledTimes(0);
	});

	it('should get and store object if not cached', async () => {
		const object = await service.getObject('new-key');

		expect(Utils.streamToBuffer(object)).resolves.toEqual(Buffer.from('object'));
		expect(getObjectBodyMock).toHaveBeenCalledWith('new-key');
		expect(redisSetSpy).toHaveBeenCalledWith(generateRedisKey('new-key'), Buffer.from('object'));
	});

	function generateRedisKey(key: string) {
		return `${S3_CACHE_REDIS_PREFIX}${key}`;
	}
});
