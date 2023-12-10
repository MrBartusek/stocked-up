import { Test, TestingModule } from '@nestjs/testing';
import { InventoryStatsService } from '../inventory/inventory-stats.service';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseStatsService } from './warehouses-stats.service';
import { Types } from 'mongoose';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';

describe('WarehouseStatsService', () => {
	let service: WarehouseStatsService;

	const mockWarehouseRepository = {
		findOneByIdAndUpdate: jest.fn(() => {}),
	};
	const mockInventoryStatsService = {
		getTotalWarehouseInventoryValue: jest.fn(() => 100),
	};

	const findOneByIdAndUpdateSpy = jest.spyOn(mockWarehouseRepository, 'findOneByIdAndUpdate');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseStatsService,
				{
					provide: WarehouseRepository,
					useValue: mockWarehouseRepository,
				},
				{
					provide: InventoryStatsService,
					useValue: mockInventoryStatsService,
				},
			],
		}).compile();

		service = module.get<WarehouseStatsService>(WarehouseStatsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should recalculate warehouse value', async () => {
		const warehouseId = new Types.ObjectId();

		const value = await service.recalculateWarehouseValue(
			warehouseId,
			OrgValueCalculationStrategy.BuyPrice,
		);

		expect(value).toBe(100);
		expect(findOneByIdAndUpdateSpy).toHaveBeenCalledWith(warehouseId, { totalValue: 100 });
	});
});
