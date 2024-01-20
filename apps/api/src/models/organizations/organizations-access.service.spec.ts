import { Test, TestingModule } from '@nestjs/testing';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsAccessService } from './organizations-access.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsAccessService', () => {
	let service: OrganizationsAccessService;

	const mockOrgRepository = new MockOrganizationsRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsAccessService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsAccessService>(OrganizationsAccessService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
