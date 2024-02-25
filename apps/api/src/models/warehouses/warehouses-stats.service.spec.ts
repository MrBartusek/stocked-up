import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseStatsService } from './warehouse-stats.service';

describe('WarehouseStatsService', () => {
	let service: WarehouseStatsService;

	const recalculateQueueMock = {
		add: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehouseStatsService,
				{
					provide: getQueueToken('warehouse-recalculate'),
					useValue: recalculateQueueMock,
				},
			],
		}).compile();

		service = module.get<WarehouseStatsService>(WarehouseStatsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should add recalculate job', async () => {
		const warehouse = new Types.ObjectId();
		const expectedJobData = { warehouse };

		await service.recalculateTotalValue(warehouse);

		expect(recalculateQueueMock.add).toBeCalledWith(
			expectedJobData,
			expect.objectContaining({
				jobId: expect.any(String),
			}),
		);
	});
});
