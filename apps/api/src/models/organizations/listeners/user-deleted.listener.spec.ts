import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { UserDeletedEvent } from '../../users/events/user-deleted.event';
import { UserDocument } from '../../users/schemas/user.schema';
import { OrganizationsAclService } from '../organizations-acl.service';
import { OrganizationsService } from '../organizations.service';
import { UserDeletedListener } from './user-deleted.listener';

describe('UserDeletedListener', () => {
	let listener: UserDeletedListener;

	const mockOrgService = {
		listAllForUser: jest.fn(),
		delete: jest.fn(),
	};

	const mockAclService = {
		deleteRule: jest.fn(() => ({
			name: 'organization',
		})),
		hasOwner: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserDeletedListener,
				{
					provide: OrganizationsService,
					useValue: mockOrgService,
				},
				{
					provide: OrganizationsAclService,
					useValue: mockAclService,
				},
			],
		}).compile();

		listener = module.get<UserDeletedListener>(UserDeletedListener);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(listener).toBeDefined();
	});

	it('should delete user from org when it is not an owner', async () => {
		const orgId = new Types.ObjectId();
		const userId = new Types.ObjectId();

		mockOrgService.listAllForUser.mockResolvedValue([
			{
				_id: orgId,
				acls: [
					{
						user: new Types.ObjectId(),
						role: OrganizationSecurityRole.OWNER,
					},
					{
						user: userId,
						role: OrganizationSecurityRole.MEMBER,
					},
				],
			},
		]);
		mockAclService.hasOwner.mockResolvedValue(true);
		const user: UserDocument = { _id: userId } as any;
		const event = new UserDeletedEvent(user);

		await listener.handleUserDelete(event);

		expect(mockAclService.deleteRule).toBeCalledWith(orgId, userId);
	});

	it('should delete user and org when it is last member', async () => {
		const orgId = new Types.ObjectId();
		const userId = new Types.ObjectId();

		mockOrgService.listAllForUser.mockResolvedValue([
			{
				_id: orgId,
				acls: [
					{
						user: userId,
						role: OrganizationSecurityRole.OWNER,
					},
				],
			},
		]);
		const user: UserDocument = { _id: userId } as any;
		const event = new UserDeletedEvent(user);

		await listener.handleUserDelete(event);

		expect(mockAclService.deleteRule).toBeCalledWith(orgId, userId);
		expect(mockOrgService.delete).toBeCalledWith(orgId);
	});
});
