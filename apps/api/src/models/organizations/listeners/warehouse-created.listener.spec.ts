import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseCreatedEvent } from '../../warehouses/events/warehouse-created.event';
import { WarehouseDocument } from '../../warehouses/schemas/warehouse.schema';
import { OrganizationsWarehouseRefService } from '../organizations-warehouse-ref.service';
import { WarehouseCreatedListener } from './warehouse-created.listener';

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
