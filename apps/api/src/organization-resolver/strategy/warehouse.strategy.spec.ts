import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehousesService } from '../../models/warehouses/warehouses.service';
import { WarehouseStrategy } from './warehouse.strategy';

describe('WarehouseStrategy', () => {
	let strategy: WarehouseStrategy;

	const mockWarehousesService = {
		findById: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseStrategy,
				{
					provide: WarehousesService,
					useValue: mockWarehousesService,
				},
			],
		}).compile();
		strategy = module.get<WarehouseStrategy>(WarehouseStrategy);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return organization ID when warehouse is found', async () => {
		const warehouseId = new Types.ObjectId();
		const organizationId = new Types.ObjectId();
		mockWarehousesService.findById.mockResolvedValue({ organization: organizationId });

		const result = await strategy.resolve(warehouseId);

		expect(result).toEqual(organizationId);
	});

	it('should return null when warehouse is not found', async () => {
		const warehouseId = new Types.ObjectId();
		mockWarehousesService.findById.mockResolvedValueOnce(null);

		const result = await strategy.resolve(warehouseId);

		expect(result).toBeNull();
	});
});
