import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationUpdatedEvent } from '../../organizations/events/organization-updated.event';
import { OrganizationDocument } from '../../organizations/schemas/organization.schema';
import { WarehouseStatsService } from '../warehouse-stats.service';
import { OrganizationSettingsUpdatedListener } from './organization-settings-updated.listener';

describe('OrganizationSettingsUpdatedListener', () => {
	let listener: OrganizationSettingsUpdatedListener;

	const mockStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const recalculateSpy = jest.spyOn(mockStatsService, 'recalculateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationSettingsUpdatedListener,
				{
					provide: WarehouseStatsService,
					useValue: mockStatsService,
				},
			],
		}).compile();

		listener = module.get<OrganizationSettingsUpdatedListener>(OrganizationSettingsUpdatedListener);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should recalculate on organization.settings.updated', async () => {
		const org: OrganizationDocument = {
			_id: new Types.ObjectId(),
			warehouses: Array(5).fill(() => ({
				id: new Types.ObjectId(),
				name: `warehouse`,
			})),
		} as any;
		const event = new OrganizationUpdatedEvent(org);

		await listener.handleOrganizationUpdated(event);

		expect(recalculateSpy).toBeCalledTimes(5);
		expect(recalculateSpy).toBeCalledWith(org.warehouses[0].id);
	});
});
