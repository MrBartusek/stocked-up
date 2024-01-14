import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseStatsService } from '../warehouses/warehouses-stats.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationRepository } from './organizations.repository';
import { OrgValueCalculationStrategy } from './schemas/org-settings';

describe('OrganizationsStatsService', () => {
	let service: OrganizationsStatsService;

	const mockOrgRepository = {
		findOneAndUpdate: jest.fn(() => {
			return {
				stats: {
					totalProducts: 100,
					totalValue: 100,
					totalPendingOrders: 100,
				},
			};
		}),
		findById: jest.fn(() => {
			return {
				settings: {
					valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
				},
				warehouses: Array(8).fill({
					id: new Types.ObjectId(),
				}),
			};
		}),
	};

	const mockWarehouseStatsService = {
		recalculateWarehouseValue: jest.fn(() => 100),
	};

	const recalculateWarehouseValueSpy = jest.spyOn(
		mockWarehouseStatsService,
		'recalculateWarehouseValue',
	);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsStatsService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
				{
					provide: WarehouseStatsService,
					useValue: mockWarehouseStatsService,
				},
			],
		}).compile();

		service = module.get<OrganizationsStatsService>(OrganizationsStatsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should recalculate total value', async () => {
		const org = await service.recalculateTotalValue(new Types.ObjectId());
		expect(org.stats.totalValue).toEqual(expect.any(Number));
		expect(recalculateWarehouseValueSpy).toHaveBeenCalledTimes(8);
	});

	it('should update products count', async () => {
		const org = await service.updateProductsCount(new Types.ObjectId(), 500);
		expect(org.stats.totalProducts).toEqual(100);
	});

	it('should update pending orders', async () => {
		const org = await service.updatePendingOrders(new Types.ObjectId(), 500);
		expect(org.stats.totalPendingOrders).toEqual(100);
	});
});
