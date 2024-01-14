import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { Types } from 'mongoose';
import { CreateWarehouseDto, PatchOrganizationSettingsDto, UpdateWarehouseDto } from 'shared-types';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrgValueCalculationStrategy } from './schemas/org-settings';

const MOCK_USER_WITH_ORGS = new Types.ObjectId('6576d1aa2800e698b8543a7b');
const MOCK_USER_NO_ORGS = new Types.ObjectId('6576d1aed164e14809b2b7d0');

const MOCK_TAKEN_ORGANIZATION_ID = new Types.ObjectId('6576d5d0aa08da850c18ef42');
const MOCK_FREE_ORGANIZATION_ID = new Types.ObjectId('6576d5d32200a50ebb3698d9');

describe('OrganizationsController', () => {
	let controller: OrganizationsController;

	const regularMockFindFunction = (id?: Types.ObjectId) => {
		return {
			_id: id,
			name: 'test-org',
			warehouses: [
				{
					_id: new Types.ObjectId(),
					name: 'test-warehouse-a',
				},
				{
					_id: new Types.ObjectId(),
					name: 'test-warehouse-b',
				},
			],
		};
	};

	const mockWarehousesService = {
		create: jest.fn((organization: Types.ObjectId, dto: CreateWarehouseDto) => {
			return {
				_id: new Types.ObjectId(),
				organization,
				...dto,
			};
		}),
	};

	const mockOrganizationsService = {
		create: jest.fn((dto: CreateWarehouseDto) => ({
			...regularMockFindFunction(new Types.ObjectId()),
			...dto,
		})),
		addWarehouseReference: jest.fn((id) => regularMockFindFunction(id)),
		updateAcl: jest.fn((id) => regularMockFindFunction(id)),
		listAllForUser: jest.fn((id) => {
			if (id.toString() != MOCK_USER_WITH_ORGS.toString()) return { items: [] };
			return { items: Array(2).fill(regularMockFindFunction(new Types.ObjectId())) };
		}),
		update: jest.fn((id, dto: UpdateWarehouseDto) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return {
				...regularMockFindFunction(id),
				...dto,
			};
		}),
		delete: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return regularMockFindFunction(id);
		}),
		exist: jest.fn((id) => {
			return id.toString() == MOCK_TAKEN_ORGANIZATION_ID.toString();
		}),
		updateSettings: jest.fn((id, dto: PatchOrganizationSettingsDto) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return {
				...regularMockFindFunction(id),
				settings: dto,
			};
		}),
		findAllWarehouses: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return [];
			return regularMockFindFunction(id).warehouses;
		}),
		findById: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return regularMockFindFunction(id);
		}),
		nameTaken: jest.fn((name) => name == 'taken'),
	};

	const mockOrganizationsStatsService = {
		recalculateTotalValue: jest.fn(),
	};

	const addWarehouseReferenceSpy = jest.spyOn(mockOrganizationsService, 'addWarehouseReference');
	const recalculateTotalValueSpy = jest.spyOn(
		mockOrganizationsStatsService,
		'recalculateTotalValue',
	);

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationsController],
			providers: [OrganizationsService, OrganizationsStatsService, WarehousesService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehousesService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrganizationsStatsService)
			.compile();

		controller = module.get<OrganizationsController>(OrganizationsController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create organization', () => {
		const mockRequest = { user: { id: MOCK_USER_WITH_ORGS } } as any as Request;

		it('should create organization', async () => {
			const org = await controller.create(
				{
					name: 'tes-org',
					warehouse: {
						name: 'test-warehouse',
						address: 'test-address',
					},
				},
				mockRequest,
			);

			expect(org).toEqual(
				expect.objectContaining({
					name: 'test-org',
				}),
			);
			expect(addWarehouseReferenceSpy).toHaveBeenCalledWith(
				expect.any(Types.ObjectId),
				expect.objectContaining({
					name: 'test-warehouse',
					address: 'test-address',
				}),
			);
		});

		it('should not create organization with taken name', () => {
			const org = controller.create(
				{
					name: 'taken',
					warehouse: {
						name: 'test-warehouse',
						address: 'test-address',
					},
				},
				mockRequest,
			);

			expect(org).rejects.toThrow(BadRequestException);
			expect(org).rejects.toThrow('taken');
		});
	});

	describe('Find all organizations', () => {
		it('should find all organizations for user', async () => {
			const mockRequest = { user: { id: MOCK_USER_WITH_ORGS } } as any as Request;
			const orgs = await controller.list(mockRequest, { page: 1 });

			expect(orgs.items.length).toBe(2);
			expect(orgs.items[0]).toEqual(
				expect.objectContaining({
					name: 'test-org',
				}),
			);
		});

		it('should not find organizations for user that does not have any', async () => {
			const mockRequest = { user: { id: MOCK_USER_NO_ORGS } } as any as Request;
			const orgs = await controller.list(mockRequest, { page: 1 });

			expect(orgs.items.length).toBe(0);
		});
	});

	describe('Update organization', () => {
		it('should update organization', async () => {
			const org = await controller.update(MOCK_TAKEN_ORGANIZATION_ID, {
				name: 'updated-org',
			} as any);

			expect(org).toEqual(
				expect.objectContaining({
					name: 'updated-org',
				}),
			);
		});

		it('should not update organization that does not exist', async () => {
			const org = controller.update(MOCK_FREE_ORGANIZATION_ID, {
				name: 'updated-org',
			} as any);

			expect(org).rejects.toThrow(NotFoundException);
		});
	});

	describe('Delete organization', () => {
		it('should delete organization', async () => {
			const org = await controller.delete(MOCK_TAKEN_ORGANIZATION_ID);

			expect(org).toEqual(
				expect.objectContaining({
					name: 'test-org',
				}),
			);
		});

		it('should not delete organization that does not exist', () => {
			const org = controller.delete(MOCK_FREE_ORGANIZATION_ID);

			expect(org).rejects.toThrow(NotFoundException);
		});
	});

	describe('Find one organization', () => {
		it('should find organization', async () => {
			const org = await controller.findById(MOCK_TAKEN_ORGANIZATION_ID);

			expect(org).toEqual(
				expect.objectContaining({
					name: 'test-org',
				}),
			);
		});

		it('should not find organization that does not exist', async () => {
			const org = controller.findById(MOCK_FREE_ORGANIZATION_ID);

			await expect(org).rejects.toThrow(NotFoundException);
		});
	});

	describe('Organization settings', () => {
		it('should update organization settings', async () => {
			const updatedSettings = await controller.updateSettings(MOCK_TAKEN_ORGANIZATION_ID, {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			});

			expect(updatedSettings.valueCalculationStrategy).toBe(OrgValueCalculationStrategy.BuyPrice);
			expect(recalculateTotalValueSpy).toHaveBeenCalledWith(MOCK_TAKEN_ORGANIZATION_ID);
		});

		it('should not update organization settings of org that does not exist', async () => {
			const updateSettings = controller.updateSettings(MOCK_FREE_ORGANIZATION_ID, {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			});

			await expect(updateSettings).rejects.toThrow(NotFoundException);
		});
	});
});
