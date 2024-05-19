import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { MockOrganizationsRepository } from './mocks/mock-organizations-repository';
import { OrganizationsAclService } from './organizations-acl.service';
import { OrganizationRepository } from './organizations.repository';

describe('OrganizationsAclService', () => {
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

	const findOneAndUpdateSpy = jest.spyOn(mockOrgRepository, 'findOneAndUpdate');

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should list rules', async () => {
		const rules = await service.getAllRules(new Types.ObjectId());
		expect(rules.length).toBeGreaterThan(0);
	});

	it('should get one rule', async () => {
		const orgId = new Types.ObjectId();
		const allRules = await service.getAllRules(orgId);

		const rule = await service.getRule(orgId, allRules[0].user);
		expect(rule.role).toBe(OrganizationSecurityRole.OWNER);
	});

	it('should add rule', async () => {
		const orgId = new Types.ObjectId();
		await service.addRule(orgId, {
			user: new Types.ObjectId(),
			role: OrganizationSecurityRole.MEMBER,
		});

		expect(findOneAndUpdateSpy).toBeCalledWith(
			expect.objectContaining({
				_id: orgId,
			}),
			expect.objectContaining({
				$push: expect.anything(),
			}),
		);
	});

	it('should update rule', async () => {
		const orgId = new Types.ObjectId();
		await service.updateRule(orgId, new Types.ObjectId(), OrganizationSecurityRole.MEMBER);

		expect(findOneAndUpdateSpy).toBeCalledWith(
			expect.objectContaining({
				_id: orgId,
			}),
			expect.objectContaining({
				$set: expect.anything(),
			}),
		);
	});

	it('should delete rule', async () => {
		const orgId = new Types.ObjectId();
		await service.deleteRule(orgId, new Types.ObjectId());

		expect(findOneAndUpdateSpy).toBeCalledWith(
			expect.objectContaining({
				_id: orgId,
			}),
			expect.objectContaining({
				$pull: expect.anything(),
			}),
		);
	});

	it('should check if rule exist', async () => {
		const orgId = new Types.ObjectId();
		const allRules = await service.getAllRules(orgId);

		const exist = await service.ruleExist(orgId, allRules[0].user);

		expect(exist).toBe(true);
	});

	it('should check if org has owner', async () => {
		const orgId = new Types.ObjectId();
		const hasOwner = await service.hasOwner(orgId);
		expect(hasOwner).toBe(true);
	});

	it('should get org owner', async () => {
		const orgId = new Types.ObjectId();
		const owner = await service.getOwner(orgId);
		expect(owner).toEqual(expect.any(Types.ObjectId));
	});

	it('should paginate rules', async () => {
		const rules = await service.paginateRules(new Types.ObjectId(), { page: 1 });

		expect(rules.items.length).toBeGreaterThan(1);
		expect(rules.meta.page).toBe(1);
	});
});
