import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { InventoryService } from '../inventory/inventory.service';
import { MockWarehousesRepository } from './mocks/mock-warehouses-repository';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
	let service: WarehousesService;

	const mockWarehousesRepository = new MockWarehousesRepository();

	const mockInventoryService = {
		deleteManyByWarehouse: jest.fn(),
	};

	const deleteManyByWarehouseSpy = jest.spyOn(mockInventoryService, 'deleteManyByWarehouse');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehousesService,
				{
					provide: WarehouseRepository,
					useValue: mockWarehousesRepository,
				},
				{
					provide: InventoryService,
					useValue: mockInventoryService,
				},
			],
		}).compile();

		service = module.get<WarehousesService>(WarehousesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create warehouse', async () => {
		const dto = { name: 'test-name', address: 'test-address' };
		const warehouse = await service.create(new Types.ObjectId(), dto);

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
	});

	it('should update warehouse', async () => {
		const dto = { name: 'updated-name', address: 'updated-address' };
		const warehouse = await service.create(new Types.ObjectId(), dto);

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'updated-name',
				address: 'updated-address',
			}),
		);
	});

	it('should delete warehouse', async () => {
		const warehouse = await service.delete(new Types.ObjectId());

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
		expect(deleteManyByWarehouseSpy).toHaveBeenCalledWith(warehouse._id);
	});

	it('should check if warehouse exist', () => {
		expect(service.exist(new Types.ObjectId())).resolves.toBe(true);
	});

	it('should find warehouse by id', () => {
		expect(service.findById(new Types.ObjectId())).resolves.toEqual(
			expect.objectContaining({
				_id: expect.any(Types.ObjectId),
				name: expect.any(String),
				address: expect.any(String),
			}),
		);
	});
});
