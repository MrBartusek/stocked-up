import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { InventoryService } from '../inventory/inventory.service';

describe('WarehousesController', () => {
	let controller: WarehousesController;

	const mockWarehouseService = {
		findById: jest.fn((id) => {
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
	};

	const mockOrganizationsService = {
		deleteWarehouseReference: jest.fn(),
	};

	const mockInventoryService = {
		deleteManyByWarehouse: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService, OrganizationsService, InventoryService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehouseService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(InventoryService)
			.useValue(mockInventoryService)
			.compile();

		controller = module.get<WarehousesController>(WarehousesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should find warehouse by id', () => {
		const res = controller.findOne(new Types.ObjectId());
		expect(res).resolves.toEqual({
			id: expect.any(Types.ObjectId),
			name: expect.any(String),
			address: expect.any(String),
		});
	});
});
