import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
	let service: OrganizationsService;

	const mockOrganizationRepository = new MockOrganizationsRepository();

	const mockWarehousesService = {
		delete: jest.fn(),
	};

	const mockProductsService = {
		list: jest.fn(() => [{ _id: 'product-id' }]),
		deleteAllByOrg: jest.fn(() => 1),
	};

	const mockStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const warehouseDeleteSpy = jest.spyOn(mockWarehousesService, 'delete');
	const productDeleteSpy = jest.spyOn(mockProductsService, 'deleteAllByOrg');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsService,
				{
					provide: OrganizationRepository,
					useValue: mockOrganizationRepository,
				},
				{
					provide: WarehousesService,
					useValue: mockWarehousesService,
				},
				{
					provide: ProductsService,
					useValue: mockProductsService,
				},
				{
					provide: OrganizationsStatsService,
					useValue: mockStatsService,
				},
			],
		}).compile();

		service = module.get<OrganizationsService>(OrganizationsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create organization', async () => {
		const org = await service.create({ name: 'test-name' } as any);
		expect(org.name).toBe('test-name');
	});

	it('should update organization', async () => {
		const org = await service.update(new Types.ObjectId(), { name: 'updated-name' } as any);
		expect(org.name).toBe('updated-name');
	});

	it('should delete organization (with children)', async () => {
		const org = await service.delete(new Types.ObjectId());

		expect(org.name).toBe('test-name');
		expect(warehouseDeleteSpy).toHaveBeenCalledWith(org.warehouses[0].id);
		expect(productDeleteSpy).toBeCalledWith(org._id);
	});

	it('should find by id', async () => {
		const org = await service.findById(new Types.ObjectId());
		expect(org.name).toBe('test-name');
	});

	it('should check if org exist', async () => {
		const exist = await service.exist(new Types.ObjectId());
		expect(exist).toBe(true);
	});

	it('should check if name is taken', async () => {
		const taken = await service.nameTaken('taken');
		expect(taken).toBe(true);
	});

	describe('Warehouse references', () => {
		it('should add warehouse reference', async () => {
			const org = await service.addWarehouseReference(new Types.ObjectId(), {} as any);
			expect(org.name).toBe('test-name');
		});

		it('should update warehouse reference', async () => {
			const org = await service.updateWarehouseReference({} as any);
			expect(org.name).toBe('test-name');
		});

		it('should remove warehouse reference', async () => {
			const org = await service.deleteWarehouseReference(new Types.ObjectId());
			expect(org.name).toBe('test-name');
		});
	});
});
