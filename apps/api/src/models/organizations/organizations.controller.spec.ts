import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MockSecurityPipe } from '../../mocks/mock-security.pipe';
import { mockUserRequest } from '../../mocks/mock-user-request';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasOwnerAccessPipe } from '../../security/pipes/has-owner-access.pipe';
import { WarehousesService } from '../warehouses/warehouses.service';
import { PatchOrganizationSettingsDto } from './dto/path-organization-settings.dto';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrgValueCalculationStrategy } from './schemas/org-settings';
import { HasAdminAccessPipe } from '../../security/pipes/has-admin-access.pipe';

describe('OrganizationsController', () => {
	let controller: OrganizationsController;

	const mockOrgRepo = new MockOrganizationsRepository();

	const mockWarehousesService = {
		create: jest.fn(),
	};

	const mockOrganizationsService = {
		create: jest.fn((id) => mockOrgRepo.create(id)),
		findById: jest.fn((id) => mockOrgRepo.findById(id)),
		addWarehouseReference: jest.fn(() => mockOrgRepo.findById(new Types.ObjectId())),
		updateAcl: jest.fn((id) => mockOrgRepo.findById(id)),
		paginateAllForUser: jest.fn(() => mockOrgRepo.paginate(new Types.ObjectId(), {})),
		update: jest.fn((id, data) => mockOrgRepo.findOneByIdAndUpdate(id, data)),
		delete: jest.fn((id) => mockOrgRepo.deleteOneById(id)),
		updateSettings: jest.fn((id, dto: PatchOrganizationSettingsDto) => {
			return {
				...mockOrgRepo.findById(id),
				settings: dto,
			};
		}),
		isUserOwnerOfAny: jest.fn(() => true),
	};

	const mockAclService = {
		addRule: jest.fn((id) => mockOrganizationsService.findById(id)),
	};

	const addAclRuleSpy = jest.spyOn(mockAclService, 'addRule');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationsController],
			providers: [OrganizationsService, OrganizationsAclService, WarehousesService],
		})
			.overrideProvider(WarehousesService)
			.useValue(mockWarehousesService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsAclService)
			.useValue(mockAclService)
			.overridePipe(HasOrganizationAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOwnerAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasAdminAccessPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<OrganizationsController>(OrganizationsController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create organization', async () => {
		const warehouseId = new Types.ObjectId();
		mockWarehousesService.create.mockResolvedValue({
			name: 'test-warehouse',
			_id: warehouseId,
		});
		mockOrganizationsService.findById.mockResolvedValue({
			warehouses: [{ name: 'test-warehouse', id: warehouseId }],
		});

		const org = await controller.create(
			{
				name: 'test-name',
				warehouse: {
					name: 'test-warehouse',
					address: 'test-address',
				},
			},
			mockUserRequest,
		);

		expect(org.warehouses[0].id).toEqual(warehouseId);
		expect(addAclRuleSpy).toHaveBeenCalled();
	});

	it('should find all organizations for user', async () => {
		const orgs = await controller.list(mockUserRequest, { page: 1 });

		expect(orgs.items.length).toBe(10);
		expect(orgs.items[0]).toEqual(
			expect.objectContaining({
				name: 'test-name',
			}),
		);
	});

	it('should check is user owner of any org', async () => {
		const result = await controller.ownerCheck(mockUserRequest);

		expect(result.response).toBe(true);
	});

	it('should update organization', async () => {
		const org = await controller.update(new Types.ObjectId(), {
			name: 'updated-org',
		} as any);

		expect(org).toEqual(
			expect.objectContaining({
				name: 'updated-org',
			}),
		);
	});

	it('should delete organization', async () => {
		const org = await controller.delete(new Types.ObjectId());

		expect(org).toEqual(
			expect.objectContaining({
				name: 'test-name',
			}),
		);
	});
	it('should find organization', async () => {
		mockOrganizationsService.findById.mockResolvedValue({
			name: 'test-name',
		});

		const org = await controller.findById(new Types.ObjectId());

		expect(org).toEqual(
			expect.objectContaining({
				name: 'test-name',
			}),
		);
	});

	it('should update organization settings', async () => {
		const updatedSettings = await controller.updateSettings(new Types.ObjectId(), {
			valueCalculationStrategy: OrgValueCalculationStrategy.BuyPrice,
		});

		expect(updatedSettings.valueCalculationStrategy).toBe(OrgValueCalculationStrategy.BuyPrice);
	});
});
