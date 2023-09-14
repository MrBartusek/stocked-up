import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
	let service: WarehousesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WarehousesService],
		}).compile();

		service = module.get<WarehousesService>(WarehousesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
