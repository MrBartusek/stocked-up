import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { Types } from 'mongoose';
import { CreateWarehouseDto } from '../warehouses/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../warehouses/dto/update-warehouse.dto';
import { WarehousesService } from '../warehouses/warehouses.service';
import { PatchOrganizationSettingsDto } from './dto/path-organization-settings.dto';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrgValueCalculationStrategy } from './schemas/org-settings';
import { OrganizationsAccessService } from './organizations-access.service';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';

const MOCK_USER_WITH_ORGS = new Types.ObjectId('6576d1aa2800e698b8543a7b');
const MOCK_USER_NO_ORGS = new Types.ObjectId('6576d1aed164e14809b2b7d0');

const MOCK_TAKEN_ORGANIZATION_ID = new Types.ObjectId('6576d5d0aa08da850c18ef42');
const MOCK_FREE_ORGANIZATION_ID = new Types.ObjectId('6576d5d32200a50ebb3698d9');

describe('OrganizationsController', () => {
	let controller: OrganizationsController;

	const mockOrgRepo = new MockOrganizationsRepository();

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
		create: jest.fn((dto: CreateWarehouseDto) => mockOrgRepo.create(dto)),
		addWarehouseReference: jest.fn((id) => mockOrgRepo.findById(id)),
		updateAcl: jest.fn((id) => mockOrgRepo.findById(id)),
		listAllForUser: jest.fn((id, pageQueryDto) => {
			if (id.toString() != MOCK_USER_WITH_ORGS.toString()) return { items: [] };
			return mockOrgRepo.paginate(id, pageQueryDto);
		}),
		update: jest.fn((id, dto: UpdateWarehouseDto) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return mockOrgRepo.findOneByIdAndUpdate(id, dto);
		}),
		delete: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return mockOrgRepo.deleteOneById(id);
		}),
		exist: jest.fn((id) => {
			return id.toString() == MOCK_TAKEN_ORGANIZATION_ID.toString();
		}),
		updateSettings: jest.fn((id, dto: PatchOrganizationSettingsDto) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return {
				...mockOrgRepo.findById(id),
				settings: dto,
			};
		}),
		findById: jest.fn((id) => {
			if (id.toString() != MOCK_TAKEN_ORGANIZATION_ID.toString()) return;
			return mockOrgRepo.findById(id);
		}),
	};

	const mockSecurityService = {
		addRule: jest.fn(),
	};

	const addWarehouseReferenceSpy = jest.spyOn(mockOrganizationsService, 'addWarehouseReference');
	const addSecurityRuleSpy = jest.spyOn(mockSecurityService, 'addRule');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationsController],
			providers: [OrganizationsService, OrganizationsAccessService, WarehousesService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehousesService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsAccessService)
			.useValue(mockSecurityService)
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
					name: 'test-name',
					warehouse: {
						name: 'test-warehouse',
						address: 'test-address',
					},
				},
				mockRequest,
			);

			expect(org).toEqual(
				expect.objectContaining({
					name: 'test-name',
				}),
			);
			expect(addWarehouseReferenceSpy).toHaveBeenCalledWith(
				expect.any(Types.ObjectId),
				expect.objectContaining({
					name: 'test-warehouse',
					address: 'test-address',
				}),
			);
			expect(addSecurityRuleSpy).toHaveBeenCalled();
		});
	});

	describe('Find all organizations', () => {
		it('should find all organizations for user', async () => {
			const mockRequest = { user: { id: MOCK_USER_WITH_ORGS } } as any as Request;
			const orgs = await controller.list(mockRequest, { page: 1 });

			expect(orgs.items.length).toBe(10);
			expect(orgs.items[0]).toEqual(
				expect.objectContaining({
					name: 'test-name',
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
					name: 'test-name',
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
					name: 'test-name',
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
		});

		it('should not update organization settings of org that does not exist', async () => {
			const updateSettings = controller.updateSettings(MOCK_FREE_ORGANIZATION_ID, {
				valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
			});

			await expect(updateSettings).rejects.toThrow(NotFoundException);
		});
	});
});
