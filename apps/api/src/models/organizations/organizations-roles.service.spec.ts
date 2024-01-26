import { Test, TestingModule } from '@nestjs/testing';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsRolesService } from './organizations-roles.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsRolesService', () => {
	let service: OrganizationsRolesService;

	const mockOrgRepository = new MockOrganizationsRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsRolesService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsRolesService>(OrganizationsRolesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
