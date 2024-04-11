import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationResolverService } from './organization-resolver.service';
import { InventoryStrategy } from './strategy/inventory.strategy';
import { OrganizationStrategy } from './strategy/organization.strategy';
import { ProductsStrategy } from './strategy/products.strategy';
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
				{
					provide: OrganizationStrategy,
					useValue: mockStrategy,
				},
				{
					provide: InventoryStrategy,
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

	it('should resolve from organization', () => {
		expect(service.resolve(MOCK_ORG_ID, OrganizationResourceType.ORGANIZATION)).toBe(MOCK_ORG_ID);
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

	it('should resolve from inventory', () => {
		expect(service.resolve(new Types.ObjectId(), OrganizationResourceType.INVENTORY)).toBe(
			MOCK_ORG_ID,
		);
	});
});
