import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockSecurityPipe } from '../../mocks/mock-security.pipe';
import { HasInventoryAccessPipe } from '../../security/pipes/has-inventory-access.pipe';
import { HasProductAccessPipe } from '../../security/pipes/has-product-access.pipe';
import { HasWarehouseAccessPipe } from '../../security/pipes/has-warehouse-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MockInventoryRepository } from './mocks/mock-inventory-repository';

const TAKEN_PRODUCT_ID = new Types.ObjectId();

describe('InventoryController', () => {
	let controller: InventoryController;

	const inventoryRepo = new MockInventoryRepository();

	const mockInventoryService = {
		findByProduct: jest.fn(async (warehouse, product) => {
			if (!TAKEN_PRODUCT_ID.equals(product)) return null;
			const items = await inventoryRepo.findAndAggregateWithProduct();
			return items[0];
		}),
		create: jest.fn((dto) => inventoryRepo.create(dto)),
		update: jest.fn((id, dto) => inventoryRepo.findOneByIdAndUpdate(id, dto)),
		delete: jest.fn((id) => inventoryRepo.deleteOneById(id)),
		listByWarehouse: jest.fn((filter, query) =>
			inventoryRepo.aggregateWithProductAndPaginate(filter, query),
		),
		findOne: jest.fn(async () => {
			const items = await inventoryRepo.findAndAggregateWithProduct();
			return items[0];
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [InventoryController],
			providers: [InventoryService],
		})
			.overrideProvider(InventoryService)
			.useValue(mockInventoryService)
			.overridePipe(SecurityValidationPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasWarehouseAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasInventoryAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasProductAccessPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<InventoryController>(InventoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create inventory item', async () => {
		const organization = await controller.create({
			organizationId: new Types.ObjectId().toString(),
			productId: new Types.ObjectId().toString(),
			warehouseId: new Types.ObjectId().toString(),
			quantity: 1,
		});

		expect(organization).toBeUndefined();
	});

	it('should update inventory item', async () => {
		const item = await controller.update(new Types.ObjectId(), { quantity: 100 });

		expect(item).toBeUndefined();
	});

	it('should delete inventory item', async () => {
		const item = await controller.delete(new Types.ObjectId());

		expect(item).toBeUndefined();
	});

	it('should find item by product', async () => {
		const item = await controller.findByProduct(new Types.ObjectId(), TAKEN_PRODUCT_ID);

		expect(item.name).toBe('test-product');
	});

	it('should list items by warehouse', async () => {
		const result = await controller.list(new Types.ObjectId(), { page: 1 });

		expect(result.items.length).toBe(10);
		expect(result.items[0]).toEqual(
			expect.objectContaining({
				name: 'test-product',
			}),
		);
	});

	it('should find one item', async () => {
		const item = await controller.findOne(new Types.ObjectId());

		expect(item).toEqual(
			expect.objectContaining({
				name: 'test-product',
			}),
		);
	});
});
