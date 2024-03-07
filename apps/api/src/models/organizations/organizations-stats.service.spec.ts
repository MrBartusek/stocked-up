import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationsStatsService } from './organizations-stats.service';

describe('OrganizationsStatsService', () => {
	let service: OrganizationsStatsService;

	const recalculateQueueMock = {
		add: jest.fn(),
	};

	const countQueueMock = {
		add: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsStatsService,
				{
					provide: getQueueToken('org-recalculate'),
					useValue: recalculateQueueMock,
				},
				{
					provide: getQueueToken('products-count'),
					useValue: countQueueMock,
				},
			],
		}).compile();

		service = module.get<OrganizationsStatsService>(OrganizationsStatsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should add total value job', async () => {
		const organization = new Types.ObjectId();
		const expectedJobData = { organization };

		await service.updateTotalValue(organization);

		expect(recalculateQueueMock.add).toBeCalledWith(
			expectedJobData,
			expect.objectContaining({
				jobId: expect.any(String),
			}),
		);
	});

	it('should add products count job', async () => {
		const organization = new Types.ObjectId();
		const expectedJobData = { organization };

		await service.updateProductsCount(organization);

		expect(countQueueMock.add).toBeCalledWith(
			expectedJobData,
			expect.objectContaining({
				jobId: expect.any(String),
			}),
		);
	});
});
