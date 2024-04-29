import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { Types } from 'mongoose';
import { InventoryService } from '../../inventory/inventory.service';
import { OrganizationsService } from '../../organizations/organizations.service';
import { OrgValueCalculationStrategy } from '../../organizations/schemas/org-settings';
import { OrganizationDocument } from '../../organizations/schemas/organization.schema';
import { WarehouseRecalculatedEvent } from '../events/warehouse-recalculated.event';
import { WarehouseRecalculateJobData } from '../types/warehouse-recalculate-job-data.type';
import { WarehousesService } from '../warehouses.service';
import { WarehouseRecalculateProcessor } from './warehouse-recalculate.processor';

describe('WarehouseRecalculateProcessor', () => {
	let processor: WarehouseRecalculateProcessor;

	const mockEventEmitter = {
		emit: jest.fn(),
	};
	const mockOrgService = {
		findById: jest.fn(),
	};
	const mockWarehouseService = {
		findById: jest.fn(),
		updateStats: jest.fn((id, stats) => ({ _id: id, stats })),
	};
	const mockInventoryService = {
		calculateStockValue: jest.fn(() => 10),
		calculateTotalQuantity: jest.fn(() => 100),
	};

	const emitSpy = jest.spyOn(mockEventEmitter, 'emit');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseRecalculateProcessor,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
				{
					provide: OrganizationsService,
					useValue: mockOrgService,
				},
				{
					provide: WarehousesService,
					useValue: mockWarehouseService,
				},
				{
					provide: InventoryService,
					useValue: mockInventoryService,
				},
			],
		}).compile();

		processor = module.get<WarehouseRecalculateProcessor>(WarehouseRecalculateProcessor);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(processor).toBeDefined();
	});

	it('should process "warehouse-recalculate" queue', async () => {
		const warehouseId = new Types.ObjectId();
		const orgId = new Types.ObjectId();
		const mockOrg: Partial<OrganizationDocument> = {
			_id: orgId,
			settings: {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
				currency: 'USD',
			},
		};

		mockWarehouseService.findById.mockImplementation((id) =>
			id == warehouseId ? { _id: id, organization: orgId } : null,
		);
		mockOrgService.findById.mockImplementation((id) => (id == orgId ? mockOrg : null));

		const job: Job<WarehouseRecalculateJobData> = {
			data: {
				warehouse: warehouseId,
			},
		} as any;
		await processor.handleRecalculate(job);

		expect(mockWarehouseService.updateStats).toBeCalledWith(warehouseId, {
			totalValue: 10,
			totalQuantity: 100,
		});
		expect(emitSpy).toBeCalledWith(
			'warehouse.recalculated',
			expect.any(WarehouseRecalculatedEvent),
		);
	});
});
