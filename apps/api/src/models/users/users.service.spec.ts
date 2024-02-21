import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { GravatarService } from '../../gravatar/gravatar.service';
import { ImagesService } from '../../images/images.service';
import { OrganizationsAclService } from '../organizations/organizations-acl.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	const mockUserRepository = {
		create: jest.fn((dto) => ({
			id: new Types.ObjectId(),
			...dto,
		})),
		findOne: jest.fn(() => ({
			id: new Types.ObjectId(),
			profile: {
				username: 'test',
			},
		})),
		findById: jest.fn((id) => ({ id })),
	};

	const mockImagesService = {
		uploadImage: jest.fn(() => 'key'),
	};

	const mockGravatarService = {
		getGravatarBuffer: jest.fn((email) => email == 'with-gravatar@dokurno.dev'),
	};

	const organizationsService = {};
	const organizationsAclService = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UserRepository,
					useValue: mockUserRepository,
				},
				{
					provide: ImagesService,
					useValue: mockImagesService,
				},
				{
					provide: GravatarService,
					useValue: mockGravatarService,
				},
				{
					provide: OrganizationsService,
					useValue: organizationsService,
				},
				{
					provide: OrganizationsAclService,
					useValue: organizationsAclService,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('should create user', () => {
		it('without gravatar', () => {
			expect(
				service.create({ username: 'test', email: 'test@dokurno.dev', passwordHash: 'test' }),
			).resolves.toEqual(
				expect.objectContaining({
					id: expect.any(Types.ObjectId),
					profile: expect.objectContaining({
						username: expect.any(String),
						email: expect.any(String),
						imageKey: null,
					}),
					auth: expect.objectContaining({ password: expect.any(String) }),
				}),
			);
		});

		it('with gravatar', () => {
			expect(
				service.create({
					username: 'test',
					email: 'with-gravatar@dokurno.dev',
					passwordHash: 'test',
				}),
			).resolves.toEqual(
				expect.objectContaining({
					profile: expect.objectContaining({
						imageKey: expect.any(String),
					}),
				}),
			);
		});
	});

	it('should find by username', () => {
		expect(service.findOne('test')).toEqual(
			expect.objectContaining({
				id: expect.any(Types.ObjectId),
				profile: { username: 'test' },
			}),
		);
	});

	it('should find by id', () => {
		expect(service.findById(new Types.ObjectId())).toEqual(
			expect.objectContaining({
				id: expect.any(Types.ObjectId),
			}),
		);
	});
});
