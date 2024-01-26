import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../models/inventory/inventory.service';
import { OrganizationsStatsService } from '../models/organizations/organizations-stats.service';
import { OrganizationsService } from '../models/organizations/organizations.service';
import { ProductsService } from '../models/products/products.service';
import { UsersService } from '../models/users/users.service';
import { WarehousesService } from '../models/warehouses/warehouses.service';
import { DemoService } from './demo.service';
import { Types } from 'mongoose';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';

describe('DemoService', () => {
	let service: DemoService;

	const mockUsersService = {
		create: jest.fn(() => ({
			_id: new Types.ObjectId(),
			profile: {
				username: 'demo',
			},
		})),
	};
	const mockOrganizationsService = {
		create: jest.fn(() => ({
			_id: new Types.ObjectId(),
			warehouses: Array(4).fill(() => ({ id: new Types.ObjectId() })),
		})),
		addWarehouseReference: jest.fn(() => ({
			_id: new Types.ObjectId(),
			warehouses: Array(4).fill({ id: new Types.ObjectId() }),
		})),
		updateAcl: jest.fn(),
	};

	const mockOrganizationsStatsService = {
		updateProductsCount: jest.fn(),
		recalculateTotalValue: jest.fn(),
	};

	const mockOrgSecurityService = {
		addRule: jest.fn(),
	};

	const mockWarehousesService = {
		create: jest.fn(() => ({
			_id: new Types.ObjectId(),
		})),
	};

	const mockProductsService = {
		create: jest.fn(() => ({
			_id: new Types.ObjectId(),
		})),
	};

	const mockInventoryService = {
		create: jest.fn(() => ({
			_id: new Types.ObjectId(),
		})),
	};

	const createUserSpy = jest.spyOn(mockUsersService, 'create');
	const createOrgSpy = jest.spyOn(mockOrganizationsService, 'create');
	const createWarehouseSpy = jest.spyOn(mockWarehousesService, 'create');
	const createProductsSpy = jest.spyOn(mockProductsService, 'create');
	const createInventorySpy = jest.spyOn(mockInventoryService, 'create');
	const addSecurityRuleSpy = jest.spyOn(mockOrgSecurityService, 'addRule');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DemoService,
				UsersService,
				OrganizationsService,
				OrganizationsStatsService,
				OrganizationsAclService,
				WarehousesService,
				ProductsService,
				InventoryService,
			],
		})
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.overrideProvider(OrganizationsService)
			.useValue(mockOrganizationsService)
			.overrideProvider(OrganizationsStatsService)
			.useValue(mockOrganizationsStatsService)
			.overrideProvider(WarehousesService)
			.useValue(mockWarehousesService)
			.overrideProvider(ProductsService)
			.useValue(mockProductsService)
			.overrideProvider(InventoryService)
			.useValue(mockInventoryService)
			.overrideProvider(OrganizationsAclService)
			.useValue(mockOrgSecurityService)
			.compile();

		service = module.get<DemoService>(DemoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create demo account', async () => {
		const account = await service.setupDemoAccount();

		expect(createUserSpy).toHaveBeenCalledTimes(1);
		expect(createOrgSpy).toBeCalledTimes(1);
		expect(createWarehouseSpy).toHaveBeenCalledTimes(4);
		expect(createProductsSpy).toHaveBeenCalledTimes(30);
		expect(addSecurityRuleSpy).toHaveBeenCalledTimes(1);
		expect(createInventorySpy.mock.calls.length).toBeGreaterThan(1);

		expect(account.profile.username).toBe('demo');
	});
});
