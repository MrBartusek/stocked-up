import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ProductDeletedEvent } from '../../products/events/product-deleted.event';
import { ProductDocument } from '../../products/schemas/product.schema';
import { OrganizationsStatsService } from '../organizations-stats.service';
import { ProductEventsListener } from './product-events.listener';

describe('ProductEventsListener', () => {
	let listener: ProductEventsListener;

	const mockStatsService = {
		updateProductsCount: jest.fn(),
	};

	const updateCountSpy = jest.spyOn(mockStatsService, 'updateProductsCount');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductEventsListener,
				{
					provide: OrganizationsStatsService,
					useValue: mockStatsService,
				},
			],
		}).compile();

		listener = module.get<ProductEventsListener>(ProductEventsListener);
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should recalculate products count on product.deleted', async () => {
		const product: ProductDocument = {
			_id: new Types.ObjectId(),
			organization: new Types.ObjectId(),
		} as any;
		const event = new ProductDeletedEvent(product);

		await listener.handleProductEvent(event);

		expect(updateCountSpy).toBeCalledWith(product.organization);
	});
});
