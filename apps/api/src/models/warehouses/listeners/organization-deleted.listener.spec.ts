import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationDeleteEvent } from '../../organizations/events/organization-deleted.event';
import { OrganizationDocument } from '../../organizations/schemas/organization.schema';
import { WarehousesService } from '../warehouses.service';
import { OrganizationDeletedListener } from './organization-deleted.listener';

describe('OrganizationDeletedListener', () => {
	let listener: OrganizationDeletedListener;

	const mockWarehouseService = {
		delete: jest.fn(),
	};

	const deleteSpy = jest.spyOn(mockWarehouseService, 'delete');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationDeletedListener,
				{
					provide: WarehousesService,
					useValue: mockWarehouseService,
				},
			],
		}).compile();

		listener = module.get<OrganizationDeletedListener>(OrganizationDeletedListener);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should delete all warehouses on organization.deleted', async () => {
		const org: OrganizationDocument = {
			_id: new Types.ObjectId(),
			warehouses: Array(5).fill(() => ({
				id: new Types.ObjectId(),
				name: `warehouse`,
			})),
		} as any;
		const event = new OrganizationDeleteEvent(org);

		await listener.handleOrgDelete(event);

		expect(deleteSpy).toBeCalledTimes(5);
		expect(deleteSpy).toBeCalledWith(org.warehouses[0].id);
	});
});
