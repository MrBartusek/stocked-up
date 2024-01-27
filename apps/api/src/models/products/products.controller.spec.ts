import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { MockProductsRepository } from './mocks/mock-products-repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const MOCK_TAKEN_PRODUCT_ID = new Types.ObjectId('62a23958e5a9e9b88f853a67');
const MOCK_FREE_PRODUCT_ID = new Types.ObjectId('657047c4e0cecd73abbad627');

describe('ProductsController', () => {
	let controller: ProductsController;

	const mockProductsRepo = new MockProductsRepository();

	const mockProductsService = {
		create: jest.fn((data) => mockProductsRepo.create(data)),
		update: jest.fn((id: Types.ObjectId, query: any) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			return mockProductsRepo.findOneByIdAndUpdate(id, query);
		}),
		findOne: jest.fn((id: Types.ObjectId) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			return mockProductsRepo.findById(id);
		}),
		paginate: jest.fn((query, page) => mockProductsRepo.paginate(query, page)),
		delete: jest.fn((id: Types.ObjectId) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			return mockProductsRepo.deleteOneById(id);
		}),
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
			.compile();

		controller = module.get<ProductsController>(ProductsController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create product', () => {
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
	});

	describe('Update product', () => {
		it('should update product', async () => {
			const orgId = new Types.ObjectId();
			const product = await controller.update(MOCK_TAKEN_PRODUCT_ID, {
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

		it('should not update product that does not exist', async () => {
			const product = controller.update(MOCK_FREE_PRODUCT_ID, {
				organization: new Types.ObjectId().toString(),
				name: 'updated-product',
				image: { hasImage: false },
			});

			expect(product).rejects.toThrow(NotFoundException);
		});
	});

	describe('Find product', () => {
		it('should find products', async () => {
			const product = await controller.findOne(MOCK_TAKEN_PRODUCT_ID);

			expect(product).toEqual(
				expect.objectContaining({
					name: expect.any(String),
				}),
			);
		});

		it('should not find product that does not exist', async () => {
			const product = controller.findOne(MOCK_FREE_PRODUCT_ID);

			expect(product).rejects.toThrow(NotFoundException);
		});
	});

	describe('Delete product', () => {
		it('should delete products', async () => {
			const product = await controller.delete(MOCK_TAKEN_PRODUCT_ID);

			expect(product).toEqual(
				expect.objectContaining({
					name: expect.any(String),
				}),
			);
			expect(updateProductsCountSpy).toHaveBeenCalled();
			expect(recalculateOrgSpy).toHaveBeenCalled();
		});

		it('should not delete product that does not exist', async () => {
			const product = controller.delete(MOCK_FREE_PRODUCT_ID);

			expect(product).rejects.toThrow(NotFoundException);
		});
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
