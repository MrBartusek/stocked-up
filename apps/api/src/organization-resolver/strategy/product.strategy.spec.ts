import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ProductsService } from '../../models/products/products.service';
import { ProductsStrategy } from './products.strategy';

describe('ProductsStrategy', () => {
	let strategy: ProductsStrategy;

	const mockProductsService = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsStrategy,
				{
					provide: ProductsService,
					useValue: mockProductsService,
				},
			],
		}).compile();
		strategy = module.get<ProductsStrategy>(ProductsStrategy);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return organization ID when product is found', async () => {
		const productId = new Types.ObjectId();
		const organizationId = new Types.ObjectId();
		mockProductsService.findOne.mockResolvedValue({ organization: organizationId });

		const result = await strategy.resolve(productId);

		expect(result).toEqual(organizationId);
	});

	it('should return null when product is not found', async () => {
		const productId = new Types.ObjectId();
		mockProductsService.findOne.mockResolvedValueOnce(null);

		const result = await strategy.resolve(productId);

		expect(result).toBeNull();
	});
});
