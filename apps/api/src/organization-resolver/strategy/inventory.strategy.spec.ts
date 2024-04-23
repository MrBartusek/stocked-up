import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { InventoryService } from '../../models/inventory/inventory.service';
import { InventoryStrategy } from './inventory.strategy'; // Assuming this is the correct path to your InventoryStrategy class

describe('InventoryStrategy', () => {
	let strategy: InventoryStrategy;

	const mockInventoryService = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryStrategy,
				{
					provide: InventoryService,
					useValue: mockInventoryService,
				},
			],
		}).compile();
		strategy = module.get<InventoryStrategy>(InventoryStrategy);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return organization ID when item is found', async () => {
		const itemId = new Types.ObjectId();
		const organizationId = new Types.ObjectId();
		mockInventoryService.findOne.mockResolvedValue({ organization: organizationId });

		const result = await strategy.resolve(itemId);

		expect(result).toEqual(organizationId);
	});

	it('should return null when item is not found', async () => {
		const itemId = new Types.ObjectId();
		mockInventoryService.findOne.mockResolvedValueOnce(null);

		const result = await strategy.resolve(itemId);

		expect(result).toBeNull();
	});
});
