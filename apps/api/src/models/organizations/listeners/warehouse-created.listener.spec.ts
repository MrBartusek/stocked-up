import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ProductDeletedEvent } from '../../products/events/product-deleted.event';
import { ProductDocument } from '../../products/schemas/product.schema';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { ProductEventsListener } from './product-events.listener';
import { WarehouseCreatedListener } from './warehouse-created.listener';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';
import { WarehouseCreatedEvent } from '../../warehouses/events/warehouse-created.event';
import { WarehouseDocument } from '../../warehouses/schemas/warehouse.schema';

describe('ProductEventsListener', () => {
	let listener: WarehouseCreatedListener;

	const refService = {
		addRef: jest.fn(),
	};

	const addRefSpy = jest.spyOn(refService, 'addRef');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseCreatedListener,
				{
					provide: OrganizationsWarehouseRefService,
					useValue: refService,
				},
			],
		}).compile();

		listener = module.get<WarehouseCreatedListener>(WarehouseCreatedListener);
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should add warehouse ref on warehouse.created', async () => {
		const warehouse: WarehouseDocument = {
			_id: new Types.ObjectId(),
			organization: new Types.ObjectId(),
			name: 'warehouse',
		} as any;
		const event = new WarehouseCreatedEvent(warehouse);

		await listener.handleWarehouseCreate(event);

		expect(addRefSpy).toBeCalledWith(warehouse.organization, {
			id: warehouse._id,
			name: 'warehouse',
		});
	});
});
