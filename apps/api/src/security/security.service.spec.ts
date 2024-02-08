import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { SecurityService } from './security.service';
import { OrganizationSecurityRole } from 'shared-types';

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
});
