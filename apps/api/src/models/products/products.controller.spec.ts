import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateProductDto } from 'shared-types';
import { InventoryService } from '../inventory/inventory.service';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const MOCK_TAKEN_PRODUCT_ID = new Types.ObjectId('62a23958e5a9e9b88f853a67');
const MOCK_FREE_PRODUCT_ID = new Types.ObjectId('657047c4e0cecd73abbad627');

describe('ProductsController', () => {
	let controller: ProductsController;

	const regularMockFindFunction = (id?: Types.ObjectId) => {
		return {
			_id: id,
			name: 'test-product',
			organization: new Types.ObjectId(),
			buyPrice: 10,
			sellPrice: 10,
		};
	};

	const mockProductsService = {
		create: jest.fn((dto: CreateProductDto) => {
			return dto;
		}),
		update: jest.fn((id: Types.ObjectId, query: any) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			const { organizationId, ...rest } = query;
			return {
				...regularMockFindFunction(id),
				...rest,
				organization: organizationId,
			};
		}),
		findOne: jest.fn((id: Types.ObjectId) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			return regularMockFindFunction(id);
		}),
		findAll: jest.fn((id: Types.ObjectId) => {
			return Array(10).fill(regularMockFindFunction(id));
		}),
		delete: jest.fn((id: Types.ObjectId) => {
			if (id != MOCK_TAKEN_PRODUCT_ID) return;
			return regularMockFindFunction(id);
		}),
		countAll: jest.fn(() => 1),
	};

	const mockOrganizationsStatsService = {
		updateProductsCount: jest.fn(),
		recalculateTotalValue: jest.fn(),
	};

	const mockInventoryService = {
		deleteManyByProduct: jest.fn(),
	};

	const updateProductsCountSpy = jest.spyOn(mockOrganizationsStatsService, 'updateProductsCount');
	const deleteManyByProductSpy = jest.spyOn(mockInventoryService, 'deleteManyByProduct');
	const recalculateTotalValueSpy = jest.spyOn(
		mockOrganizationsStatsService,
		'recalculateTotalValue',
	);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [ProductsService, OrganizationsStatsService, InventoryService],
		})
			.overrideProvider(ProductsService)
			.useValue(mockProductsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrganizationsStatsService)
			.overrideProvider(InventoryService)
			.useValue(mockInventoryService)
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
				organizationId: new Types.ObjectId().toString(),
				name: 'created-product',
			});

			expect(product).toEqual(
				expect.objectContaining({
					name: 'created-product',
				}),
			);
			expect(updateProductsCountSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId), 1);
		});
	});

	describe('Update product', () => {
		it('should update product', async () => {
			const orgId = new Types.ObjectId();
			const product = await controller.update(MOCK_TAKEN_PRODUCT_ID, {
				organizationId: orgId.toString(),
				name: 'updated-product',
				image: { hasImage: false },
			});

			expect(product).toEqual(
				expect.objectContaining({
					name: 'updated-product',
				}),
			);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(orgId);
		});

		it('should not update product that does not exist', async () => {
			const product = controller.update(MOCK_FREE_PRODUCT_ID, {
				organizationId: new Types.ObjectId().toString(),
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
			expect(updateProductsCountSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId), 1);
			expect(deleteManyByProductSpy).toHaveBeenCalledWith(MOCK_TAKEN_PRODUCT_ID);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId));
		});

		it('should not delete product that does not exist', async () => {
			const product = controller.delete(MOCK_FREE_PRODUCT_ID);

			expect(product).rejects.toThrow(NotFoundException);
		});
	});

	it('should find all products by org', async () => {
		const product = await controller.findAll(new Types.ObjectId());

		expect(product).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
				}),
			]),
		);
	});
});
