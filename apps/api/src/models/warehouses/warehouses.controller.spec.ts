import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

describe('WarehousesController', () => {
	let controller: WarehousesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService],
		}).compile();

		controller = module.get<WarehousesController>(WarehousesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
