import { Test, TestingModule } from '@nestjs/testing';
import { S3CacheService } from './s3-cache.service';

describe('S3CacheService', () => {
	let service: S3CacheService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [S3CacheService],
		}).compile();

		service = module.get<S3CacheService>(S3CacheService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
