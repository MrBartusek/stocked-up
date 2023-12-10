import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationsStatsService } from './organizations-stats.service';
import { WarehousesService } from '../warehouses/warehouses.service';

describe('OrganizationsController', () => {
	let controller: OrganizationsController;

	const mockWarehousesService = {};
	const mockOrganizationsService = {};
	const mockOrganizationsStatsService = {};

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

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create organization', () => {
		test.todo('should create organization');

		test.todo('should not create organization with taken name');
	});

	describe('Find all organizations', () => {
		test.todo('should find all organizations for user');

		test.todo('should not find organizations for user that does not have any');
	});

	describe('Update organization', () => {
		test.todo('should update organization');

		test.todo('should not update organization that does not exist');
	});

	describe('Delete organization', () => {
		test.todo('should delete organization');

		test.todo('should not delete organization that does not exist');
	});

	describe('Find one organization', () => {
		test.todo('should find organization');

		test.todo('should not find organization that does not exist');
	});

	describe("List organization's warehouses", () => {
		test.todo("should list organization's warehouses");

		test.todo('should return empty list when no warehouses');
	});

	describe('Organization settings', () => {
		test.todo('should update organization settings');

		test.todo('should not update organization settings of org that does not exist');
	});
});
