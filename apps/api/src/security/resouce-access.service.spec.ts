import { Test, TestingModule } from '@nestjs/testing';
import { ResourceAccessService } from './resouce-access.service';

describe('ResourceAccessService', () => {
	let service: ResourceAccessService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ResourceAccessService],
		}).compile();

		service = module.get<ResourceAccessService>(ResourceAccessService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
