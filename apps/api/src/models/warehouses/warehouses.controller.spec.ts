import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateWarehouseDto, UpdateWarehouseDto } from 'shared-types';
import { InventoryService } from '../inventory/inventory.service';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

const MOCK_TAKEN_ORG_ID = new Types.ObjectId('62a23958e5a9e9b88f853a67');
const MOCK_FREE_ORG_ID = new Types.ObjectId('657047c4e0cecd73abbad627');
const MOCK_TAKEN_WAREHOUSE_ID = new Types.ObjectId('65704ab7cb27dac5067d1b8f');
const MOCK_FREE_WAREHOUSE_ID = new Types.ObjectId('65704abb8346be3d278a806f');

describe('WarehousesController', () => {
	let controller: WarehousesController;

	const mockWarehouseService = {
		findById: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_WAREHOUSE_ID.toString()) return undefined;
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
		create: jest.fn((dto: CreateWarehouseDto) => {
			return {
				_id: MOCK_FREE_WAREHOUSE_ID,
				name: dto.name,
				address: dto.address,
			};
		}),
		update: jest.fn((id, dto: UpdateWarehouseDto) => {
			if (id.toString() != MOCK_TAKEN_WAREHOUSE_ID.toString()) return undefined;
			return {
				_id: id,
				name: dto.name,
				address: dto.address,
			};
		}),
		delete: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_WAREHOUSE_ID.toString()) return undefined;
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
	};

	const mockOrganizationsService = {
		addWarehouseReference: jest.fn(() => ({
			_id: MOCK_TAKEN_ORG_ID,
		})),
		deleteWarehouseReference: jest.fn(() => ({
			_id: MOCK_TAKEN_ORG_ID,
		})),
		updateWarehouseReference: jest.fn(() => ({
			_id: MOCK_TAKEN_ORG_ID,
		})),
		exist: jest.fn((id: Types.ObjectId) => {
			return id.toString() == MOCK_TAKEN_ORG_ID.toString();
		}),
	};

	const mockOrganizationsStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const addWarehouseReferenceSpy = jest.spyOn(mockOrganizationsService, 'addWarehouseReference');
	const deleteWarehouseReferenceSpy = jest.spyOn(
		mockOrganizationsService,
		'deleteWarehouseReference',
	);
	const updateWarehouseReferenceSpy = jest.spyOn(
		mockOrganizationsService,
		'updateWarehouseReference',
	);
	const recalculateTotalValueSpy = jest.spyOn(
		mockOrganizationsStatsService,
		'recalculateTotalValue',
	);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService, OrganizationsService, OrganizationsStatsService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehouseService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrganizationsStatsService)
			.compile();

		controller = module.get<WarehousesController>(WarehousesController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findOne', () => {
		it('should find warehouse by id', async () => {
			const warehouse = await controller.findOne(MOCK_TAKEN_WAREHOUSE_ID);

			expect(warehouse).toEqual(
				expect.objectContaining({
					name: expect.any(String),
					address: expect.any(String),
				}),
			);
		});

		it('should not find warehouse that does not exist', () => {
			const warehouse = controller.findOne(MOCK_FREE_WAREHOUSE_ID);

			expect(warehouse).rejects.toThrow(NotFoundException);
		});
	});

	describe('create', () => {
		it('should create warehouse', async () => {
			const warehouse = await controller.create({
				organizationId: MOCK_TAKEN_ORG_ID.toString(),
				warehouse: {
					name: 'test-name',
					address: 'test-address',
				},
			});

			expect(warehouse).toEqual(
				expect.objectContaining({
					name: 'test-name',
					address: 'test-address',
				}),
			);
			expect(addWarehouseReferenceSpy).toHaveBeenCalledWith(
				MOCK_TAKEN_ORG_ID,
				expect.objectContaining({
					name: 'test-name',
					address: 'test-address',
				}),
			);
		});

		it('should not create warehouse in org that does not exist', () => {
			const warehouse = controller.create({
				organizationId: MOCK_FREE_ORG_ID.toString(),
				warehouse: {
					name: 'test-name',
					address: 'test-address',
				},
			});

			expect(warehouse).rejects.toThrow(NotFoundException);
		});
	});

	describe('update', () => {
		it('should update warehouse', async () => {
			const warehouse = await controller.update(MOCK_TAKEN_WAREHOUSE_ID, {
				name: 'updated-name',
				address: 'updated-address',
			});

			expect(warehouse).toEqual(
				expect.objectContaining({
					name: 'updated-name',
					address: 'updated-address',
				}),
			);
			expect(updateWarehouseReferenceSpy).toHaveBeenCalledWith(
				expect.objectContaining({
					_id: MOCK_TAKEN_WAREHOUSE_ID,
					name: 'updated-name',
				}),
			);
		});

		it('should not update warehouse that does not exist', () => {
			const warehouse = controller.update(MOCK_FREE_WAREHOUSE_ID, {} as any);

			expect(warehouse).rejects.toThrow(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete warehouse', async () => {
			const warehouse = await controller.delete(MOCK_TAKEN_WAREHOUSE_ID);

			expect(warehouse).toEqual(
				expect.objectContaining({
					name: 'test-name',
				}),
			);
			expect(deleteWarehouseReferenceSpy).toHaveBeenCalledWith(MOCK_TAKEN_WAREHOUSE_ID);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(MOCK_TAKEN_ORG_ID);
		});

		it('should not delete warehouse that does not exist', () => {
			const warehouse = controller.delete(MOCK_FREE_WAREHOUSE_ID);

			expect(warehouse).rejects.toThrow(NotFoundException);
		});
	});
});
