import { Test, TestingModule } from '@nestjs/testing';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsSecurityService } from './organizations-security.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsSecurityService', () => {
	let service: OrganizationsSecurityService;

	const mockOrgRepository = new MockOrganizationsRepository();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationsSecurityService,
				{
					provide: OrganizationRepository,
					useValue: mockOrgRepository,
				},
			],
		}).compile();

		service = module.get<OrganizationsSecurityService>(OrganizationsSecurityService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
