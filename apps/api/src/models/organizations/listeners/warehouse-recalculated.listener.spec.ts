import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseRecalculatedEvent } from '../../warehouses/events/warehouse-recalculated.event';
import { WarehouseDocument } from '../../warehouses/schemas/warehouse.schema';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { WarehouseRecalculatedListener } from './warehouse-recalculated.listener';

describe('WarehouseRecalculatedListener', () => {
	let listener: WarehouseRecalculatedListener;

	const statService = {
		updateTotalValue: jest.fn(),
	};

	const updateValueSpy = jest.spyOn(statService, 'updateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseRecalculatedListener,
				{
					provide: OrganizationsStatsService,
					useValue: statService,
				},
			],
		}).compile();

		listener = module.get<WarehouseRecalculatedListener>(WarehouseRecalculatedListener);
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should recalculate organization on warehouse recalculate', async () => {
		const warehouse: WarehouseDocument = {
			_id: new Types.ObjectId(),
			organization: new Types.ObjectId(),
			name: 'warehouse',
		} as any;
		const event = new WarehouseRecalculatedEvent(warehouse);

		await listener.handleWarehouseRecalculation(event);

		expect(updateValueSpy).toBeCalledWith(warehouse.organization);
	});
});
