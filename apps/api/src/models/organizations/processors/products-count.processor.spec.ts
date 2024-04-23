import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { Types } from 'mongoose';
import { ProductsService } from '../../products/products.service';
import { OrganizationsService } from '../organizations.service';
import { ProductsCountJobData } from '../types/products-count-job-data';
import { ProductsCountProcessor } from './products-count.processor';

describe('ProductsCountProcessor', () => {
	let processor: ProductsCountProcessor;

	const mockOrgService = {
		update: jest.fn(),
	};

	const mockProductService = {
		countAll: jest.fn(() => 100),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsCountProcessor,

				{
					provide: OrganizationsService,
					useValue: mockOrgService,
				},
				{
					provide: ProductsService,
					useValue: mockProductService,
				},
			],
		}).compile();

		processor = module.get<ProductsCountProcessor>(ProductsCountProcessor);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(processor).toBeDefined();
	});

	it('should process "products-count" queue', async () => {
		const organization = new Types.ObjectId();

		const job: Job<ProductsCountJobData> = {
			data: {
				organization,
			},
		} as any;
		await processor.handleCount(job);

		expect(mockOrgService.update).toBeCalledWith(organization, { 'stats.totalProducts': 100 });
	});
});
