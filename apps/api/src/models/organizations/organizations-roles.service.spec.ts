import { Test, TestingModule } from '@nestjs/testing';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsRolesService', () => {
	let service: OrganizationsAclService;

	const mockOrgRepository = new MockOrganizationsRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsAclService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsAclService>(OrganizationsAclService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
