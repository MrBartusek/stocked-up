import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockSecurityPipe } from '../../mocks/mock-security.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasWarehouseAccessPipe } from '../../security/pipes/has-warehouse-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { MockWarehousesRepository } from './mocks/mock-warehouses-repository';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

describe('WarehousesController', () => {
	let controller: WarehousesController;

	const mockRepo = new MockWarehousesRepository();

	const mockWarehouseService = {
		findById: jest.fn((id) => mockRepo.findById(id)),
		create: jest.fn((organization: Types.ObjectId, dto: CreateWarehouseDto) =>
			mockRepo.create({ ...organization, ...dto }),
		),
		findByOrg: jest.fn(),
		update: jest.fn((id, dto: UpdateWarehouseDto) => mockRepo.findOneByIdAndUpdate(id, dto)),
		delete: jest.fn((id) => mockRepo.deleteOneById(id)),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehouseService)
			.overridePipe(HasWarehouseAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOrganizationAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(SecurityValidationPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<WarehousesController>(WarehousesController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should find warehouse by id', async () => {
		const warehouse = await controller.findOne(new Types.ObjectId());

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: expect.any(String),
				address: expect.any(String),
			}),
		);
	});

	it('should create warehouse', async () => {
		const organizationId = new Types.ObjectId();

		const warehouse = await controller.create({
			organizationId: organizationId.toString(),
			warehouse: {
				name: 'test-name',
				address: 'test-address',
			},
		});

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'test-name',
				address: 'test-address',
			}),
		);
	});

	it('should update warehouse', async () => {
		const warehouse = await controller.update(new Types.ObjectId(), {
			name: 'updated-name',
			address: 'updated-address',
		});

		expect(warehouse).toEqual(
			expect.objectContaining({
				name: 'updated-name',
				address: 'updated-address',
			}),
		);
	});

	describe('Delete warehouse', () => {
		it('should delete warehouse', async () => {
			const warehouseId = new Types.ObjectId();
			mockWarehouseService.findByOrg.mockImplementation(async () => await mockRepo.find());

			const warehouse = await controller.delete(warehouseId);

			expect(warehouse).toEqual(
				expect.objectContaining({
					id: warehouseId,
					name: 'test-name',
				}),
			);
		});

		it('should not delete last warehouse', async () => {
			const warehouseId = new Types.ObjectId();
			const mockWarehouse = await mockRepo.findOne();
			mockWarehouseService.findByOrg.mockResolvedValue([mockWarehouse]);

			const result = controller.delete(warehouseId);

			expect(result).rejects.toThrow(BadRequestException);
		});
	});
});
