import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationSecurityRole, PageDto, SecurityRuleDto } from 'shared-types';
import { MockSecurityPipe } from '../mocks/mock-security.pipe';
import { mockUserRequest } from '../mocks/mock-user-request';
import { UsersService } from '../models/users/users.service';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { DeleteSecurityRuleDto } from './dto/delete-security-rule.dto';
import { UpdateSecurityRuleDto } from './dto/update-security-rule.dto';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { HasOwnerAccessPipe } from './pipes/has-owner-access.pipe';
import { SecurityValidationPipe } from './pipes/security-validation.pipe';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

describe('SecurityController', () => {
	let controller: SecurityController;

	const mockSecurityService = {
		addRule: jest.fn(),
		getUserRole: jest.fn(),
		updateRule: jest.fn(),
		deleteRule: jest.fn(),
		paginateMembers: jest.fn(() => ({ meta: { page: 1 }, items: [] }) as PageDto<SecurityRuleDto>),
		transferOwnership: jest.fn(),
	};

	const mockUserService = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SecurityController],
			providers: [SecurityService, UsersService],
		})
			.overrideProvider(SecurityService)
			.useValue(mockSecurityService)
			.overrideProvider(UsersService)
			.useValue(mockUserService)
			.overridePipe(SecurityValidationPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOrganizationAccessPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOwnerAccessPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<SecurityController>(SecurityController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create rule', () => {
		it('should create security rule', async () => {
			const orgId = new Types.ObjectId();
			const userId = new Types.ObjectId();
			mockUserService.findOne.mockResolvedValue({ _id: userId });
			mockSecurityService.addRule.mockImplementation((orgId) => ({
				_id: orgId,
			}));

			const dto: CreateSecurityRuleDto = {
				organization: orgId.toString(),
				email: 'test@dokurno.dev',
			};

			await controller.create(dto);

			expect(mockSecurityService.addRule).toHaveBeenCalledWith(orgId, userId);
		});

		it('should not create security rule on invalid e-mail', async () => {
			mockUserService.findOne.mockResolvedValue(null);

			const dto: CreateSecurityRuleDto = {
				organization: new Types.ObjectId().toString(),
				email: 'invalid@dokurno.dev',
			};
			const result = controller.create(dto);

			expect(result).rejects.toThrowError(NotFoundException);
		});
	});

	describe('Update security rule', () => {
		it('should update security rule', async () => {
			const orgId = new Types.ObjectId();
			const targetId = new Types.ObjectId();
			const request = mockUserRequest;
			const requester = new Types.ObjectId(request.user.id);

			mockSecurityService.getUserRole.mockImplementation((org, user) => {
				if (targetId.equals(user)) {
					return OrganizationSecurityRole.MEMBER;
				} else if (requester.equals(user)) {
					return OrganizationSecurityRole.OWNER;
				}
				return null;
			});

			const dto: UpdateSecurityRuleDto = {
				organization: orgId.toString(),
				user: targetId.toString(),
				role: OrganizationSecurityRole.ADMIN,
			};

			await controller.update(request, dto);

			expect(mockSecurityService.updateRule).toHaveBeenCalledWith(
				orgId,
				targetId,
				OrganizationSecurityRole.ADMIN,
			);
		});

		it('should not update security rule of user with higher order role', async () => {
			const orgId = new Types.ObjectId();
			const targetId = new Types.ObjectId();
			const request = mockUserRequest;
			const requester = new Types.ObjectId(request.user.id);

			mockSecurityService.getUserRole.mockImplementation((org, user) => {
				if (targetId.equals(user)) {
					return OrganizationSecurityRole.OWNER;
				} else if (requester.equals(user)) {
					return OrganizationSecurityRole.MEMBER;
				}
				return null;
			});

			const dto: UpdateSecurityRuleDto = {
				organization: orgId.toString(),
				user: targetId.toString(),
				role: OrganizationSecurityRole.ADMIN,
			};

			const result = controller.update(request, dto);

			expect(result).rejects.toThrow(ForbiddenException);
		});
	});

	it('should delete security rule', async () => {
		const orgId = new Types.ObjectId();
		const targetId = new Types.ObjectId();
		const request = mockUserRequest;
		const requester = new Types.ObjectId(request.user.id);

		mockSecurityService.getUserRole.mockImplementation((org, user) => {
			if (targetId.equals(user)) {
				return OrganizationSecurityRole.MEMBER;
			} else if (requester.equals(user)) {
				return OrganizationSecurityRole.ADMIN;
			}
			return null;
		});

		const dto: DeleteSecurityRuleDto = {
			organization: orgId.toString(),
			user: targetId.toString(),
		};

		await controller.delete(request, dto);

		expect(mockSecurityService.deleteRule).toHaveBeenCalledWith(orgId, targetId);
	});

	describe('Leave organization', () => {
		it('should leave organization', async () => {
			const orgId = new Types.ObjectId();
			const request = mockUserRequest;
			mockSecurityService.getUserRole.mockResolvedValue(OrganizationSecurityRole.MEMBER);

			await controller.leave(request, orgId);

			expect(mockSecurityService.deleteRule).toBeCalledWith(orgId, request.user.id);
		});

		it('should not leave organization when requester is owner', async () => {
			const orgId = new Types.ObjectId();
			const request = mockUserRequest;
			mockSecurityService.getUserRole.mockResolvedValue(OrganizationSecurityRole.OWNER);

			const result = controller.leave(request, orgId);

			expect(result).rejects.toThrowError(BadRequestException);
		});
	});

	it('should list rules', async () => {
		const result = await controller.listRules(new Types.ObjectId(), { page: 1 });

		expect(result.meta.page).toBe(1);
	});

	it('should get own security rule', async () => {
		const request = mockUserRequest;
		mockSecurityService.getUserRole.mockReturnValue(OrganizationSecurityRole.ADMIN);

		const result = await controller.getMeRule(request, new Types.ObjectId());

		expect(result.role).toBe(OrganizationSecurityRole.ADMIN);
	});

	it('should transfer ownership', async () => {
		const organization = new Types.ObjectId();
		const to = new Types.ObjectId();
		const result = await controller.transfer(organization, { user: to.toString() });

		expect(result.statusCode).toBe(200);
		expect(mockSecurityService.transferOwnership).toBeCalledWith(organization, to);
	});
});
