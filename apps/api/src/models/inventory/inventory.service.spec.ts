import { Test, TestingModule } from '@nestjs/testing';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
	let service: InventoryService;

	const mockInventoryRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryService,
				{
					provide: InventoryRepository,
					useValue: mockInventoryRepository,
				},
			],
		}).compile();

		service = module.get<InventoryService>(InventoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
