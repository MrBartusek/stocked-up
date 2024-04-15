import { Test, TestingModule } from '@nestjs/testing';
import { InventoryCreatedEvent } from '../../inventory/events/inventory-created.event';
import { MockInventoryRepository } from '../../inventory/mocks/mock-inventory-repository';
import { InventoryItemDocument } from '../../inventory/schemas/inventory-item.schema';
import { WarehouseStatsService } from '../warehouse-stats.service';
import { InventoryEventListener } from './inventory-events.listener';

describe('InventoryEventListener', () => {
	let listener: InventoryEventListener;

	const mockInventoryRepo = new MockInventoryRepository();

	const mockStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const recalculateSpy = jest.spyOn(mockStatsService, 'recalculateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryEventListener,
				{
					provide: WarehouseStatsService,
					useValue: mockStatsService,
				},
			],
		}).compile();

		listener = module.get<InventoryEventListener>(InventoryEventListener);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should recalculate on inventory.created', async () => {
		const item = await mockInventoryRepo.findOne();
		const event = new InventoryCreatedEvent(item as InventoryItemDocument);

		await listener.handleInventoryEvent(event);

		expect(recalculateSpy).toBeCalledWith(item.warehouse);
	});
});
