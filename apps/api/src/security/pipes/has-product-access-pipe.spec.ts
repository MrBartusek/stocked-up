import { NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { mockUserRequest } from '../../mocks/mock-user-request';
import { OrganizationResolverService } from '../../organization-resolver/organization-resolver.service';
import { OrganizationResolverMock } from '../mocks/organization-resolver.mock';
import { SecurityServiceMock } from '../mocks/security-service.mock';
import { SecurityService } from '../security.service';
import { HasProductAccessPipe } from './has-product-access.pipe';

const VALID_ORG_ID = new Types.ObjectId();
const VALID_ENTITY_ID = new Types.ObjectId();

describe('HasProductAccessPipe', () => {
	let pipe: HasProductAccessPipe;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				HasProductAccessPipe,
				{
					provide: REQUEST,
					useValue: mockUserRequest,
				},
				{
					provide: SecurityService,
					useValue: new SecurityServiceMock(VALID_ORG_ID),
				},
				{
					provide: OrganizationResolverService,
					useValue: new OrganizationResolverMock(VALID_ENTITY_ID, VALID_ORG_ID),
				},
			],
		}).compile();

		pipe = await module.resolve<HasProductAccessPipe>(HasProductAccessPipe);
	});

	it('should pass on valid ACL', () => {
		expect(pipe.transform(VALID_ENTITY_ID)).resolves.toStrictEqual(VALID_ENTITY_ID);
	});

	it('should fail on missing entity', () => {
		expect(pipe.transform(new Types.ObjectId())).rejects.toThrow(NotFoundException);
	});
});
