import { Test, TestingModule } from '@nestjs/testing';
import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
	let service: GravatarService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GravatarService],
		}).compile();

		service = module.get<GravatarService>(GravatarService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
