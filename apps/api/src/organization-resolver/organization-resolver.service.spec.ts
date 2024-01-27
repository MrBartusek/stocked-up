import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationResolverService } from './organization-resolver.service';
import { ProductsStrategy } from './strategy/products.strategy';
import { Types } from 'mongoose';
import { WarehouseStrategy } from './strategy/warehouse.strategy';
import { OrganizationResourceType } from './types/organization-resource.type';

const MOCK_ORG_ID = new Types.ObjectId();

describe('OrganizationResolverService', () => {
	let service: OrganizationResolverService;

	const mockProductsStrategy = { resolve: jest.fn(() => MOCK_ORG_ID) };
	const mockStrategy = { resolve: jest.fn(() => MOCK_ORG_ID) };

	const productResolveSpy = jest.spyOn(mockProductsStrategy, 'resolve');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationResolverService,
				{
					provide: ProductsStrategy,
					useValue: mockProductsStrategy,
				},
				{
					provide: WarehouseStrategy,
					useValue: mockStrategy,
				},
			],
		}).compile();

		service = module.get<OrganizationResolverService>(OrganizationResolverService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should resolve from product', () => {
		const productId = new Types.ObjectId();
		expect(service.resolve(productId, OrganizationResourceType.PRODUCT)).toBe(MOCK_ORG_ID);
		expect(productResolveSpy).toBeCalledWith(productId);
	});

	it('should resolve from warehouse', () => {
		expect(service.resolve(new Types.ObjectId(), OrganizationResourceType.WAREHOUSE)).toBe(
			MOCK_ORG_ID,
		);
	});

	it.skip('should resolve from inventory', () => {
		expect(service.resolve(new Types.ObjectId(), OrganizationResourceType.INVENTORY)).toBe(
			MOCK_ORG_ID,
		);
	});
});
