import { ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrganizationSecurityRole } from 'shared-types';
import { mockUserRequest } from '../../mocks/mock-user-request';
import { SecurityServiceMock } from '../mocks/security-service.mock';
import { SecurityService } from '../security.service';
import { HasAdminAccessPipe } from './has-admin-access.pipe';

const VALID_ORG_ID = new Types.ObjectId();
const ORG_ADMIN = new Types.ObjectId();

describe('HasAdminAccessPipe', () => {
	const securityServiceMock = {
		...new SecurityServiceMock(VALID_ORG_ID),
		getUserRole: jest.fn((org, userId) =>
			ORG_ADMIN.equals(userId) ? OrganizationSecurityRole.ADMIN : OrganizationSecurityRole.MEMBER,
		),
	} as any as SecurityService;

	it('should pass on admin', () => {
		const request = { ...mockUserRequest } as any;
		request.user.id = ORG_ADMIN;

		const pipe = new HasAdminAccessPipe(request, securityServiceMock);
		expect(pipe.transform(VALID_ORG_ID)).resolves.toStrictEqual(VALID_ORG_ID);
	});

	it('should fail on member', () => {
		const request = { ...mockUserRequest } as any;
		request.user.id = new Types.ObjectId();

		const pipe = new HasAdminAccessPipe(request, securityServiceMock);
		expect(pipe.transform(VALID_ORG_ID)).rejects.toThrowError(ForbiddenException);
	});
});
