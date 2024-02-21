import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { MockInventoryRepository } from './mocks/mock-inventory-repository';

describe('InventoryService', () => {
	let service: InventoryService;

	const mockInventoryRepository = new MockInventoryRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryService,
				{
					provide: InventoryRepository,
					useValue: mockInventoryRepository,
				},
			],
		}).compile();

		service = module.get<InventoryService>(InventoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create item', () => {
		const itemDto = {
			organizationId: new Types.ObjectId().toString(),
			productId: new Types.ObjectId().toString(),
			warehouseId: new Types.ObjectId().toString(),
			quantity: 10,
		};

		expect(service.create(itemDto)).resolves.toStrictEqual(
			expect.objectContaining({
				quantity: 10,
			}),
		);
	});

	it('should update item', () => {
		const itemId = new Types.ObjectId();
		const updateDto = {
			quantity: 20,
		};

		expect(service.update(itemId, updateDto)).resolves.toBeDefined();
	});

	it('should delete item', () => {
		const itemId = new Types.ObjectId();
		expect(service.deleteOneById(itemId)).resolves.toStrictEqual(
			expect.objectContaining({
				_id: itemId,
			}),
		);
	});

	it('should delete items by product', () => {
		const productId = new Types.ObjectId();

		expect(service.deleteManyByProduct(productId)).resolves.toBeTruthy();
	});

	it('should delete items by warehouse', () => {
		const warehouseId = new Types.ObjectId();
		expect(service.deleteManyByWarehouse(warehouseId)).resolves.toBeTruthy();
	});

	it('should find item by ID', async () => {
		const itemId = new Types.ObjectId();
		const result = await service.findOne(itemId);
		expect(result).toBeDefined();
	});

	it('should find item by warehouse and product', async () => {
		const warehouseId = new Types.ObjectId();
		const productId = new Types.ObjectId();

		expect(service.findByProduct(warehouseId, productId)).resolves.toStrictEqual(
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
