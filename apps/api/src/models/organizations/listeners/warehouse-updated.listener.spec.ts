import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseDeletedEvent } from '../../warehouses/events/warehouse-deleted.event';
import { WarehouseDocument } from '../../warehouses/schemas/warehouse.schema';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';
import { WarehouseDeletedListener } from './warehouse-deleted.listener';
import { WarehouseUpdatedListener } from './warehouse-updated.listener';
import { WarehouseUpdatedEvent } from '../../warehouses/events/warehouse-updated.event';

describe('WarehouseUpdatedListener', () => {
	let listener: WarehouseUpdatedListener;

	const refService = {
		updateRef: jest.fn(),
	};

	const updateRef = jest.spyOn(refService, 'updateRef');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseUpdatedListener,
				{
					provide: OrganizationsWarehouseRefService,
					useValue: refService,
				},
			],
		}).compile();

		listener = module.get<WarehouseUpdatedListener>(WarehouseUpdatedListener);
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should remove warehouse ref on warehouse.deleted', async () => {
		const warehouse: WarehouseDocument = {
			_id: new Types.ObjectId(),
			organization: new Types.ObjectId(),
			name: 'warehouse',
		} as any;
		const event = new WarehouseUpdatedEvent(warehouse);

		await listener.handleWarehouseUpdate(event);

		expect(updateRef).toBeCalledWith(warehouse.organization, {
			id: warehouse._id,
			name: 'warehouse',
		});
	});
});
