import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrgValueCalculationStrategy } from '../organizations/schemas/org-settings';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

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

	const getMockInventoryItem = (id: Types.ObjectId) => {
		return {
			_id: id,
			warehouse: MOCK_IDS.warehouse.taken,
			quantity: 0,
			location: 'test-location',
			product: {
				_id: MOCK_IDS.product.taken,
				name: 'test-product',
				buyPrice: 10,
				sellPrice: 10,
			},
		};
	};

	const mockInventoryService = {
		create: jest.fn((id: Types.ObjectId) => getMockInventoryItem(id)),
		findOne: jest.fn((id) => {
			if (id.toString() != MOCK_IDS.inventory.taken.toString()) return;
			return getMockInventoryItem(id);
		}),
		update: jest.fn((id, dto) => {
			if (id.toString() != MOCK_IDS.inventory.taken.toString()) return;
			return {
				...getMockInventoryItem(id),
				...dto,
			};
		}),
		delete: jest.fn((id) => {
			if (id.toString() != MOCK_IDS.inventory.taken.toString()) return;
			return getMockInventoryItem(id);
		}),
		findAllInWarehouse: jest.fn((id) => {
			if (id.toString() != MOCK_IDS.warehouse.taken.toString()) return [];
			return Array(10).fill(getMockInventoryItem(new Types.ObjectId()));
		}),
		findByProduct: jest.fn(() => null),
	};

	const mockWarehousesService = {
		exist: jest.fn((id: Types.ObjectId) => id.toString() == MOCK_IDS.warehouse.taken.toString()),
	};

	const mockProductsService = {
		exist: jest.fn((id: Types.ObjectId) => id.toString() == MOCK_IDS.product.taken.toString()),
	};

	const mockOrganizationsService = {
		findByWarehouse: jest.fn(() => ({
			_id: new Types.ObjectId(),
			name: 'test-org',
			settings: {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			},
		})),
		recalculateTotalValue: jest.fn(),
	};

	const mockOrganizationsStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const recalculateTotalValueSpy = jest.spyOn(
		mockOrganizationsStatsService,
		'recalculateTotalValue',
	);

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

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create inventory', () => {
		it('should create inventory item', async () => {
			const item = await controller.create({
				warehouseId: MOCK_IDS.warehouse.taken.toString(),
				productId: MOCK_IDS.product.taken.toString(),
			});

			expect(item).toEqual(
				expect.objectContaining({
					quantity: 0,
				}),
			);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId));
		});

		it('should not create inventory item when warehouse does not exist', async () => {
			const item = controller.create({
				warehouseId: MOCK_IDS.warehouse.free.toString(),
				productId: MOCK_IDS.product.taken.toString(),
			});

			expect(item).rejects.toThrow(BadRequestException);
		});

		it('should not create inventory item when product does not exist', async () => {
			const item = controller.create({
				warehouseId: MOCK_IDS.warehouse.taken.toString(),
				productId: MOCK_IDS.product.free.toString(),
			});

			expect(item).rejects.toThrow(BadRequestException);
		});
	});

	describe('Update inventory', () => {
		it('should update inventory item', async () => {
			const item = await controller.update(MOCK_IDS.inventory.taken, {
				quantity: 100,
			});

			expect(item).toEqual(
				expect.objectContaining({
					quantity: 100,
				}),
			);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId));
		});

		it('should not update inventory item that does not exist', async () => {
			const item = controller.update(MOCK_IDS.inventory.free, {
				quantity: 100,
			});

			expect(item).rejects.toThrow(NotFoundException);
		});
	});

	describe('Delete inventory', () => {
		it('should delete inventory item', async () => {
			const item = await controller.delete(MOCK_IDS.inventory.taken);

			expect(item).toEqual(
				expect.objectContaining({
					quantity: 0,
				}),
			);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(expect.any(Types.ObjectId));
		});

		it('should not delete inventory item that does not exist', async () => {
			const item = controller.delete(MOCK_IDS.inventory.free);

			expect(item).rejects.toThrow(NotFoundException);
		});
	});

	describe('Find all inventory items', () => {
		it('should find all inventory item in warehouse', async () => {
			const items = await controller.findAll(MOCK_IDS.warehouse.taken);

			expect(items).toHaveLength(10);
			expect(items[0]).toEqual(
				expect.objectContaining({
					quantity: 0,
				}),
			);
		});

		it('should return an empty list if warehouse does not exist', async () => {
			const items = await controller.findAll(MOCK_IDS.warehouse.free);

			expect(items).toEqual([]);
		});
	});

	describe('Find one inventory items', () => {
		it('should find one inventory item', async () => {
			const item = await controller.findOne(MOCK_IDS.inventory.taken);

			expect(item).toEqual(
				expect.objectContaining({
					quantity: 0,
					name: 'test-product',
				}),
			);
		});

		it('should not find item that does not exist', async () => {
			const item = controller.findOne(MOCK_IDS.inventory.free);

			expect(item).rejects.toThrow(NotFoundException);
		});
	});
});
