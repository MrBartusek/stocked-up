import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { ProductsService } from '../products/products.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';

describe('InventoryController', () => {
	let controller: InventoryController;

	const mockInventoryService = {};
	const mockWarehousesService = {};
	const mockProductsService = {};
	const mockOrganizationsService = {};
	const mockOrganizationsStatsService = {};

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
		test.todo('should create inventory item');

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
