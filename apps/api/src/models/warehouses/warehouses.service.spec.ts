import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
	let service: WarehousesService;

	const mockWarehousesRepository = {
		create: jest.fn((dto) => {
			return dto;
		}),
		exist: jest.fn((id) => {
			return true;
		}),
		findById: jest.fn((id) => {
			return {
				id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WarehousesService,
				{
					provide: WarehouseRepository,
					useValue: mockWarehousesRepository,
				},
			],
		}).compile();

		service = module.get<WarehousesService>(WarehousesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create warehouse', () => {
		expect(service.create({ name: 'test-name', address: 'test-address' })).toEqual({
			name: expect.any(String),
			address: expect.any(String),
		});
	});

	it('should check if warehouse exist', () => {
		expect(service.exist(new Types.ObjectId())).toBe(true);
	});

	it('should find warehouse by id', () => {
		expect(service.findById(new Types.ObjectId())).toEqual({
			id: expect.any(Types.ObjectId),
			name: expect.any(String),
			address: expect.any(String),
		});
	});
});
