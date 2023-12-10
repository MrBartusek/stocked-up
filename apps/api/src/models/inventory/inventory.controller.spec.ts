import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { ProductsService } from '../products/products.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { Types } from 'mongoose';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';

const MOCK_IDS = {
	inventory: {
		taken: new Types.ObjectId('62a23958e5a9e9b88f853a67'),
		free: new Types.ObjectId('62a23958e5a9e9b88f853a68'),
	},
	product: {
		taken: new Types.ObjectId('62a23958e5a9e9b88f853a69'),
		free: new Types.ObjectId('62a23958e5a9e9b88f853a6a'),
	},
	organization: {
		taken: new Types.ObjectId('62a23958e5a9e9b88f853a6b'),
		free: new Types.ObjectId('62a23958e5a9e9b88f853a6c'),
	},
	warehouse: {
		taken: new Types.ObjectId('62a23958e5a9e9b88f853a6d'),
		free: new Types.ObjectId('62a23958e5a9e9b88f853a6e'),
	},
};

describe('InventoryController', () => {
	let controller: InventoryController;

	const getMockProduct = (id: Types.ObjectId, aggregate = false) => {
		return {
			_id: id,
			warehouse: MOCK_IDS.warehouse.taken,
			quantity: 0,
			location: 'test-location',
			product: aggregate
				? {
						_id: MOCK_IDS.product.taken,
						name: 'test-product',
						buyPrice: 10,
						sellPrice: 10,
				  }
				: MOCK_IDS.product.taken,
		};
	};

	const mockInventoryService = {
		create: jest.fn((id: Types.ObjectId) => getMockProduct(id, false)),
	};

	const mockWarehousesService = {
		exist: jest.fn((id: Types.ObjectId) => id.toString() == MOCK_IDS.warehouse.taken.toString()),
	};

	const mockProductsService = {
		exist: jest.fn((id: Types.ObjectId) => id.toString() == MOCK_IDS.product.taken.toString()),
	};

	const mockOrganizationsService = {
		findByWarehouse: jest.fn(() => ({
			settings: {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			},
		})),
	};

	const mockOrganizationsStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [InventoryController],
			providers: [
				InventoryService,
				WarehousesService,
				ProductsService,
				OrganizationsService,
				OrganizationsStatsService,
			],
		})
			.overrideProvider(InventoryService)
			.useValue(mockInventoryService)
			.overrideProvider(WarehousesService)
			.useValue(mockWarehousesService)
			.overrideProvider(ProductsService)
			.useValue(mockProductsService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrganizationsStatsService)
			.compile();

		controller = module.get<InventoryController>(InventoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create inventory', () => {
		it('should create inventory item', async () => {
			const product = await controller.create({
				warehouseId: MOCK_IDS.warehouse.taken.toString(),
				productId: MOCK_IDS.product.taken.toString(),
			});

			expect(product).toEqual(
				expect.objectContaining({
					productId: expect.any(Types.ObjectId),
				}),
			);
		});

		test.todo('should not create inventory item when warehouse does not exist');

		test.todo('should not create inventory item when product does not exist');
	});

	describe('Update inventory', () => {
		test.todo('should update inventory item');

		test.todo('should not update inventory item that does not exist');
	});

	describe('Delete inventory', () => {
		test.todo('should delete inventory item');

		test.todo('should not delete inventory item that does not exist');
	});

	describe('Find all inventory items', () => {
		test.todo('should find all inventory item in warehouse');

		test.todo('should return empty list if warehouse does not exist');
	});

	describe('Find one inventory items', () => {
		test.todo('should find one inventory item');

		test.todo('should not find item that does not exist');
	});
});
