import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationsService } from '../../organizations/organizations.service';
import { ProductUpdatedEvent } from '../../products/events/product-updated.event';
import { ProductDocument } from '../../products/schemas/product.schema';
import { WarehouseStatsService } from '../warehouse-stats.service';
import { ProductUpdatedListener } from './product-updated.listener';

describe('ProductUpdatedListener', () => {
	let listener: ProductUpdatedListener;

	const mockOrgsService = {
		findById: jest.fn(),
	};

	const mockStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const recalculateSpy = jest.spyOn(mockStatsService, 'recalculateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductUpdatedListener,
				{
					provide: WarehouseStatsService,
					useValue: mockStatsService,
				},
				{
					provide: OrganizationsService,
					useValue: mockOrgsService,
				},
			],
		}).compile();

		listener = module.get<ProductUpdatedListener>(ProductUpdatedListener);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should recalculate on organization.settings.updated', async () => {
		const orgId = new Types.ObjectId();
		const org = {
			_id: orgId,
			warehouses: Array(5).fill(() => ({
				id: new Types.ObjectId(),
				name: `warehouse`,
			})),
		};

		mockOrgsService.findById.mockImplementation((id) => {
			return id == orgId ? org : null;
		});
		const product: ProductDocument = { organization: orgId } as any;
		const event = new ProductUpdatedEvent(product);

		await listener.handleProductUpdated(event);

		expect(recalculateSpy).toBeCalledTimes(5);
		expect(recalculateSpy).toBeCalledWith(org.warehouses[0].id);
	});
});
