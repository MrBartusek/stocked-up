import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockSecurityPipe } from '../../mocks/mock-security.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasProductAccessPipe } from '../../security/pipes/has-product-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { MockProductsRepository } from './mocks/mock-products-repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
	let controller: ProductsController;

	const mockProductsRepo = new MockProductsRepository();

	const mockProductsService = {
		create: jest.fn((data) => mockProductsRepo.create(data)),
		update: jest.fn((id: Types.ObjectId, query: any) =>
			mockProductsRepo.findOneByIdAndUpdate(id, query),
		),
		findOne: jest.fn((id: Types.ObjectId) => mockProductsRepo.findById(id)),
		paginate: jest.fn((query, page) => mockProductsRepo.paginate(query, page)),
		delete: jest.fn((id: Types.ObjectId) => mockProductsRepo.deleteOneById(id)),
		countAll: jest.fn(() => mockProductsRepo.countDocuments()),
	};

	const mockOrgStatService = {
		updateProductsCount: jest.fn(),
		recalculateTotalValue: jest.fn(),
	};

	const updateProductsCountSpy = jest.spyOn(mockOrgStatService, 'updateProductsCount');
	const recalculateOrgSpy = jest.spyOn(mockOrgStatService, 'recalculateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [ProductsService, OrganizationsStatsService],
		})
			.overrideProvider(ProductsService)
			.useValue(mockProductsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrgStatService)
			.overridePipe(SecurityValidationPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasProductAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOrganizationAccessPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<ProductsController>(ProductsController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create product', async () => {
		const product = await controller.create({
			organization: new Types.ObjectId().toString(),
			name: 'created-product',
		});

		expect(product).toEqual(
			expect.objectContaining({
				name: 'created-product',
			}),
		);
		expect(updateProductsCountSpy).toHaveBeenCalled();
	});

	it('should update product', async () => {
		const orgId = new Types.ObjectId();
		const product = await controller.update(new Types.ObjectId(), {
			organization: orgId.toString(),
			name: 'updated-product',
			image: { hasImage: false },
		});

		expect(product).toEqual(
			expect.objectContaining({
				name: 'updated-product',
			}),
		);
		expect(recalculateOrgSpy).toHaveBeenCalled();
	});

	it('should find products', async () => {
		const product = await controller.findOne(new Types.ObjectId());

		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
	});

	it('should delete products', async () => {
		const product = await controller.delete(new Types.ObjectId());

		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
		expect(updateProductsCountSpy).toHaveBeenCalled();
		expect(recalculateOrgSpy).toHaveBeenCalled();
	});

	it('should find all products by org', async () => {
		const product = await controller.list(new Types.ObjectId(), { page: 1 });

		expect(product.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
				}),
			]),
		);
	});
});
