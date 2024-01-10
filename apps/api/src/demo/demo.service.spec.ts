import { Test, TestingModule } from '@nestjs/testing';
import { DemoService } from './demo.service';

describe('DemoService', () => {
	let service: DemoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DemoService],
		}).compile();

		service = module.get<DemoService>(DemoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
