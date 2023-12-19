import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateWarehouseDto } from 'shared-types';
import { WarehouseRepository } from './warehouse.repository';
import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
	let service: WarehousesService;

	const mockWarehousesRepository = {
		create: jest.fn((dto: CreateWarehouseDto) => {
			return dto;
		}),
		exist: jest.fn(() => {
			return true;
		}),
		findById: jest.fn((id: Types.ObjectId) => {
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
		deleteOneById: jest.fn((id: Types.ObjectId) => {
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
		findOneAndUpdate: jest.fn((id: Types.ObjectId, filter: any) => {
			return {
				...{ ...filter },
				_id: id,
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
		expect(service.create({ name: 'test-name', address: 'test-address' })).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
	});

	it('should update warehouse', () => {
		expect(service.create({ name: 'updated-name', address: 'updated-address' })).toEqual(
			expect.objectContaining({
				name: 'updated-name',
				address: 'updated-address',
			}),
		);
	});

	it('should delete warehouse', () => {
		expect(service.delete(new Types.ObjectId())).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
	});

	it('should check if warehouse exist', () => {
		expect(service.exist(new Types.ObjectId())).toBe(true);
	});

	it('should find warehouse by id', () => {
		expect(service.findById(new Types.ObjectId())).toEqual(
			expect.objectContaining({
				_id: expect.any(Types.ObjectId),
				name: expect.any(String),
				address: expect.any(String),
			}),
		);
	});
});
