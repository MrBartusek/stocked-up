import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationRepository } from './organizations.repository';
import { Types } from 'mongoose';

describe('OrganizationsStatsService', () => {
	let service: OrganizationsStatsService;

	const mockOrgRepository = {
		findOneAndUpdate: jest.fn((id: Types.ObjectId) => {
			return {
				stats: {
					totalProducts: 100,
					totalValue: 100,
					totalPendingOrders: 100,
				},
			};
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsStatsService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsStatsService>(OrganizationsStatsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should update total value', async () => {
		const org = await service.updateTotalValue(new Types.ObjectId(), 500);
		expect(org.stats.totalValue).toEqual(100);
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
