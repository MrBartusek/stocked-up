import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { MockInventoryRepository } from './mocks/mock-inventory-repository';

describe('InventoryService', () => {
	let service: InventoryService;

	const mockInventoryRepository = new MockInventoryRepository();
	const mockEventEmitter = {
		emit: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryService,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
				{
					provide: InventoryRepository,
					useValue: mockInventoryRepository,
				},
			],
		}).compile();

		service = module.get<InventoryService>(InventoryService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create item', async () => {
		const itemDto = {
			organizationId: new Types.ObjectId().toString(),
			productId: new Types.ObjectId().toString(),
			warehouseId: new Types.ObjectId().toString(),
			quantity: 10,
		};

		const item = await service.create(itemDto);

		expect(item).toStrictEqual(
			expect.objectContaining({
				quantity: 10,
			}),
		);
		expect(mockEventEmitter.emit).toHaveBeenCalledWith('inventory.created', expect.anything());
	});

	it('should update item', async () => {
		const itemId = new Types.ObjectId();
		const updateDto = {
			quantity: 20,
		};

		const item = await service.update(itemId, updateDto);

		expect(item).toStrictEqual(
			expect.objectContaining({
				quantity: expect.any(Number),
			}),
		);
		expect(mockEventEmitter.emit).toHaveBeenCalledWith('inventory.updated', expect.anything());
	});

	it('should delete item', async () => {
		const itemId = new Types.ObjectId();

		const item = await service.delete(itemId);

		expect(item).toStrictEqual(
			expect.objectContaining({
				_id: itemId,
			}),
		);
		expect(mockEventEmitter.emit).toHaveBeenCalledWith('inventory.deleted', expect.anything());
	});

	it('should delete items by product', async () => {
		const productId = new Types.ObjectId();

		const count = await service.deleteManyByProduct(productId);

		expect(count).toBe(10);
		expect(mockEventEmitter.emit).toHaveBeenCalledWith('inventory.deleted', expect.anything());
		expect(mockEventEmitter.emit).toHaveBeenCalledTimes(10);
	});

	it('should delete items by warehouse', async () => {
		const warehouseId = new Types.ObjectId();

		const count = await service.deleteManyByWarehouse(warehouseId);

		expect(count).toBe(10);
		expect(mockEventEmitter.emit).toHaveBeenCalledWith('inventory.deleted', expect.anything());
		expect(mockEventEmitter.emit).toHaveBeenCalledTimes(10);
	});

	it('should find item by ID', async () => {
		const itemId = new Types.ObjectId();
		const result = await service.findOne(itemId);
		expect(result).toBeDefined();
	});

	it('should find item by warehouse and product', async () => {
		const warehouseId = new Types.ObjectId();
		const productId = new Types.ObjectId();

		const item = await service.findByProduct(warehouseId, productId);

		expect(item).toStrictEqual(
			expect.objectContaining({
				warehouse: expect.any(Types.ObjectId),
				product: expect.objectContaining({
					name: expect.any(String),
				}),
			}),
		);
	});

	it('should find items with pagination', async () => {
		const query = {};
		const pageQueryDto = { page: 1, limit: 10 };

		const result = await service.find(query, pageQueryDto);

		expect(result.items.length).toBe(10);
		expect(result.items[0]).toStrictEqual(
			expect.objectContaining({
				quantity: expect.any(Number),
			}),
		);
	});

	it('should list items by warehouse with pagination', async () => {
		const warehouseId = new Types.ObjectId();
		const pageQueryDto = { page: 1, limit: 10 };

		const result = await service.listByWarehouse(warehouseId, pageQueryDto);

		expect(result.items.length).toBe(10);
		expect(result.items[0]).toStrictEqual(
			expect.objectContaining({
				quantity: expect.any(Number),
			}),
		);
	});
});
