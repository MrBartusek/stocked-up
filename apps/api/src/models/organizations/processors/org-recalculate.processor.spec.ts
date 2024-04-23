import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { Types } from 'mongoose';
import { WarehousesService } from '../../warehouses/warehouses.service';
import { OrganizationsService } from '../organizations.service';
import { OrgRecalculateJobData } from '../types/org-recalculate-job-data';
import { OrgRecalculateProcessor } from './org-recalculate.processor';

describe('OrgRecalculateProcessor', () => {
	let processor: OrgRecalculateProcessor;

	const mockOrgService = {
		findById: jest.fn(),
		update: jest.fn(),
	};

	const mockWarehouseService = {
		findById: jest.fn(() => ({
			totalValue: 100,
			totalQuantity: 8,
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrgRecalculateProcessor,

				{
					provide: OrganizationsService,
					useValue: mockOrgService,
				},
				{
					provide: WarehousesService,
					useValue: mockWarehouseService,
				},
			],
		}).compile();

		processor = module.get<OrgRecalculateProcessor>(OrgRecalculateProcessor);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(processor).toBeDefined();
	});

	it('should process "org-recalculate" queue', async () => {
		const organization = new Types.ObjectId();

		mockOrgService.findById.mockResolvedValue({
			organization,
			warehouses: [{ id: new Types.ObjectId() }, { id: new Types.ObjectId() }],
		});

		const job: Job<OrgRecalculateJobData> = {
			data: {
				organization,
			},
		} as any;
		await processor.handleRecalculate(job);

		expect(mockOrgService.update).toBeCalledWith(organization, {
			'stats.totalValue': 200,
			'stats.totalQuantity': 16,
		});
	});
});
