import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockSecurityPipe } from '../../mocks/mock-security.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasWarehouseAccessPipe } from '../../security/pipes/has-warehouse-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { MockWarehousesRepository } from './mocks/mock-warehouses-repository';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

describe('WarehousesController', () => {
	let controller: WarehousesController;

	const mockWarehousesRepository = new MockWarehousesRepository();

	const mockWarehouseService = {
		findById: jest.fn((id) => mockWarehousesRepository.findById(id)),
		create: jest.fn((organization: Types.ObjectId, dto: CreateWarehouseDto) =>
			mockWarehousesRepository.create({ ...organization, ...dto }),
		),
		update: jest.fn((id, dto: UpdateWarehouseDto) =>
			mockWarehousesRepository.findOneByIdAndUpdate(id, dto),
		),
		delete: jest.fn((id) => mockWarehousesRepository.deleteOneById(id)),
	};

	const mockOrgService = {
		addWarehouseReference: jest.fn((id) => ({
			_id: id,
		})),
		deleteWarehouseReference: jest.fn((id) => ({
			_id: id,
		})),
		updateWarehouseReference: jest.fn((id) => ({
			_id: id,
		})),
		exist: jest.fn(() => true),
	};

	const mockOrgStatService = {
		recalculateTotalValue: jest.fn(),
	};

	const addWarehouseRefSpy = jest.spyOn(mockOrgService, 'addWarehouseReference');
	const deleteWarehouseRefSpy = jest.spyOn(mockOrgService, 'deleteWarehouseReference');
	const updateWarehouseRefSpy = jest.spyOn(mockOrgService, 'updateWarehouseReference');
	const recalculateTotalValueSpy = jest.spyOn(mockOrgStatService, 'recalculateTotalValue');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarehousesController],
			providers: [WarehousesService, OrganizationsService, OrganizationsStatsService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehouseService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrgService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrgStatService)
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
		expect(addWarehouseRefSpy).toHaveBeenCalledWith(
			organizationId,
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
		expect(updateWarehouseRefSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				name: 'updated-name',
			}),
		);
	});

	it('should delete warehouse', async () => {
		const warehouseId = new Types.ObjectId();
		const warehouse = await controller.delete(warehouseId);

		expect(warehouse).toEqual(
			expect.objectContaining({
				id: warehouseId,
				name: 'test-name',
			}),
		);
		expect(deleteWarehouseRefSpy).toHaveBeenCalledWith(warehouseId);
		expect(recalculateTotalValueSpy).toHaveBeenCalledWith(warehouseId);
	});
});
