import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { PageQueryDto } from '../dto/page-query.dto';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { SecurityService } from './security.service';

const PRIVILEGED_USER_ID = new Types.ObjectId();

describe('SecurityService', () => {
	let service: SecurityService;

	const mockAclService = {
		getRule: jest.fn((org, user) => {
			if (PRIVILEGED_USER_ID.equals(user)) {
				return {
					user,
					role: OrganizationSecurityRole.ADMIN,
				};
			}
			return null;
		}),
		addRule: jest.fn(),
		deleteRule: jest.fn(),
		updateRule: jest.fn(),
		paginateRules: jest.fn(),
		ruleExist: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SecurityService,
				{
					provide: OrganizationsAclService,
					useValue: mockAclService,
				},
			],
		}).compile();

		service = module.get<SecurityService>(SecurityService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get role of user with access to organization', () => {
		expect(service.getUserRole(new Types.ObjectId(), PRIVILEGED_USER_ID)).resolves.toBe(
			OrganizationSecurityRole.ADMIN,
		);
	});

	it('should not get role of user with has no access to organization', () => {
		expect(service.getUserRole(new Types.ObjectId(), new Types.ObjectId())).resolves.toBeNull();
	});

	it('should check org access', () => {
		expect(
			service.hasOrganizationAccess(new Types.ObjectId(), PRIVILEGED_USER_ID),
		).resolves.toBeTruthy();
	});

	describe('Role CRUDs passthrough to OrganizationAclService', () => {
		describe('Add rule', () => {
			it('should add rule', async () => {
				const organizationId = new Types.ObjectId();
				const userId = new Types.ObjectId();
				mockAclService.ruleExist.mockResolvedValue(false);

				await service.addRule(organizationId, { _id: userId } as any);

				expect(mockAclService.addRule).toHaveBeenCalledWith(organizationId, {
					user: userId,
					role: OrganizationSecurityRole.MEMBER,
				});
			});

			it('should not add duplicate rule', async () => {
				const organizationId = new Types.ObjectId();
				const userId = new Types.ObjectId();
				mockAclService.ruleExist.mockResolvedValue(true);

				const result = service.addRule(organizationId, { _id: userId } as any);

				expect(result).rejects.toThrow(BadRequestException);
			});
		});

		it('should delete rule', async () => {
			const organizationId = new Types.ObjectId();
			const userId = new Types.ObjectId();

			await service.deleteRule(organizationId, userId);

			expect(mockAclService.deleteRule).toHaveBeenCalledWith(organizationId, userId);
		});

		it('should update rule', async () => {
			const organizationId = new Types.ObjectId();
			const userId = new Types.ObjectId();
			const newRole: OrganizationSecurityRole = OrganizationSecurityRole.ADMIN;

			await service.updateRule(organizationId, userId, newRole);

			expect(mockAclService.updateRule).toHaveBeenCalledWith(organizationId, userId, newRole);
		});

		it('should paginate rules', async () => {
			const organizationId = new Types.ObjectId();
			const pageQueryDto: PageQueryDto = { page: 1, pageSize: 10 };

			await service.paginateMembers(organizationId, pageQueryDto);

			expect(mockAclService.paginateRules).toHaveBeenCalledWith(organizationId, pageQueryDto);
		});
	});
});
