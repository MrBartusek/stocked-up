import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateWarehouseDto } from 'shared-types';
import { ProductsService } from '../products/products.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
	let service: OrganizationsService;

	const regularMockFindFunction = (id: Types.ObjectId) => {
		return {
			_id: id,
			name: 'test-name',
			currency: 'USD',
			stats: {},
			settings: {},
			acls: [],
			warehouses: [
				{
					id: 'warehouse-id',
				},
			],
		};
	};

	const mockOrganizationRepository = {
		create: jest.fn((dto: CreateWarehouseDto) => {
			return dto;
		}),
		findOneByIdAndUpdate: jest.fn((id: Types.ObjectId, dto: any) => ({
			...regularMockFindFunction(id),
			...dto.$set,
		})),
		deleteOneById: jest.fn((id: Types.ObjectId) => regularMockFindFunction(id)),
		exist: jest.fn(() => true),
		findOneAndUpdate: jest.fn((id: Types.ObjectId) => regularMockFindFunction(id)),
		findById: jest.fn((id: Types.ObjectId) => regularMockFindFunction(id)),
	};

	const mockWarehousesService = {
		delete: jest.fn(),
	};

	const mockProductsService = {
		findAll: jest.fn(() => [{ _id: 'product-id' }]),
		delete: jest.fn(),
	};

	const warehouseDeleteSpy = jest.spyOn(mockWarehousesService, 'delete');
	const productDeleteSpy = jest.spyOn(mockProductsService, 'delete');

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
		const org = await service.delete({ name: 'test-name' } as any);

		expect(org.name).toBe('test-name');
		expect(warehouseDeleteSpy).toHaveBeenCalledWith(org.warehouses[0].id);
		expect(productDeleteSpy).toBeCalledWith('product-id');
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
