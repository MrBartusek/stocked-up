import { ForbiddenException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { mockUserRequest } from '../../mocks/mock-user-request';
import { SecurityServiceMock } from '../mocks/security-service.mock';
import { SecurityService } from '../security.service';
import { HasOrganizationAccessPipe } from './has-organization-access.pipe';

const VALID_ORG_ID = new Types.ObjectId();

describe('HasOrganizationAccessPipe', () => {
	let pipe: HasOrganizationAccessPipe;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				HasOrganizationAccessPipe,
				{
					provide: REQUEST,
					useValue: mockUserRequest,
				},
				{
					provide: SecurityService,
					useValue: new SecurityServiceMock(VALID_ORG_ID),
				},
			],
		}).compile();

		pipe = await module.resolve<HasOrganizationAccessPipe>(HasOrganizationAccessPipe);
	});

	it('should be defined', () => {
		expect(pipe).toBeDefined();
	});

	it('should pass on valid ACL', () => {
		expect(pipe.transform(VALID_ORG_ID)).resolves.toStrictEqual(VALID_ORG_ID);
	});

	it('should fail on missing ACL', () => {
		expect(pipe.transform(new Types.ObjectId())).rejects.toThrow(ForbiddenException);
	});
});
