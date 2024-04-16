import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseDeletedEvent } from '../../warehouses/events/warehouse-deleted.event';
import { WarehouseDocument } from '../../warehouses/schemas/warehouse.schema';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';
import { WarehouseDeletedListener } from './warehouse-deleted.listener';

describe('WarehouseDeletedListener', () => {
	let listener: WarehouseDeletedListener;

	const refService = {
		deleteRef: jest.fn(),
	};

	const orgStatsService = {
		updateTotalValue: jest.fn(),
	};

	const deleteRefSpy = jest.spyOn(refService, 'deleteRef');
	const updateValueSpy = jest.spyOn(orgStatsService, 'updateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseDeletedListener,
				{
					provide: OrganizationsWarehouseRefService,
					useValue: refService,
				},
				{
					provide: OrganizationsStatsService,
					useValue: orgStatsService,
				},
			],
		}).compile();

		listener = module.get<WarehouseDeletedListener>(WarehouseDeletedListener);
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
		const event = new WarehouseDeletedEvent(warehouse);

		await listener.handleWarehouseDelete(event);

		expect(deleteRefSpy).toBeCalledWith(warehouse.organization, warehouse._id);
		expect(updateValueSpy).toBeCalledWith(warehouse.organization);
	});
});
