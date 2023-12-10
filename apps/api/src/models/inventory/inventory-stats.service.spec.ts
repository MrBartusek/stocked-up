import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { InventoryStatsService } from './inventory-stats.service';
import { InventoryRepository } from './inventory.repository';

describe('InventoryStatsService', () => {
	let service: InventoryStatsService;

	const mockInventoryRepository = {
		calculateTotalWarehouseValue: jest.fn(() => 100),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryStatsService,
				{
					provide: InventoryRepository,
					useValue: mockInventoryRepository,
				},
			],
		}).compile();

		service = module.get<InventoryStatsService>(InventoryStatsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should recalculate warehouse value', async () => {
		const warehouseId = new Types.ObjectId();

		const value = await service.getTotalWarehouseInventoryValue(
			warehouseId,
			OrgValueCalculationStrategy.BuyPrice,
		);

		expect(value).toBe(100);
	});
});
