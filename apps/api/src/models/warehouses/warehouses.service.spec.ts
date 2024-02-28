import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockWarehousesRepository } from './mocks/mock-warehouses-repository';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
	let service: WarehousesService;

	const mockWarehousesRepository = new MockWarehousesRepository();

	const mockEventEmitter = {
		emit: jest.fn(),
	};

	const emitSpy = jest.spyOn(mockEventEmitter, 'emit');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehousesService,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
				{
					provide: WarehouseRepository,
					useValue: mockWarehousesRepository,
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
		expect(emitSpy).toHaveBeenCalledWith('warehouse.created', expect.anything());
	});

	it('should update warehouse', async () => {
		const dto = { name: 'updated-name', address: 'updated-address' };
		const warehouse = await service.update(new Types.ObjectId(), dto);

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'updated-name',
				address: 'updated-address',
			}),
		);
		expect(emitSpy).toHaveBeenCalledWith('warehouse.updated', expect.anything());
	});

	it('should delete warehouse', async () => {
		const warehouse = await service.delete(new Types.ObjectId());

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
		expect(emitSpy).toHaveBeenCalledWith('warehouse.deleted', expect.anything());
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
