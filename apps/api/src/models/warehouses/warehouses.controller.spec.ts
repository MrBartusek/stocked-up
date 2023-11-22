import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { Types } from 'mongoose';

describe('WarehousesController', () => {
	let controller: WarehousesController;

	const mockWarehouseService = {
		findById: jest.fn((id) => {
			return {
				_id: id,
				name: 'test-name',
				address: 'test-address',
			};
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehouseService)
			.compile();

		controller = module.get<WarehousesController>(WarehousesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should find warehouse by id', () => {
		const res = controller.findOne(new Types.ObjectId());
		expect(res).resolves.toEqual({
			id: expect.any(Types.ObjectId),
			name: expect.any(String),
			address: expect.any(String),
		});
	});
});
