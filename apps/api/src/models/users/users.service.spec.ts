import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { GravatarService } from '../../gravatar/gravatar.service';
import { ImagesService } from '../../images/images.service';

describe('UsersService', () => {
	let service: UsersService;

	const mockUserRepository = {
		create: jest.fn((dto) => ({
			id: '123',
			...dto,
		})),
		findOne: jest.fn((query) => ({
			id: '123',
			profile: {
				username: query['profile.username'],
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
			).resolves.toEqual({
				id: expect.any(String),
				profile: { username: expect.any(String), email: expect.any(String), imageKey: null },
				auth: { password: expect.any(String) },
			});
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
				id: expect.any(String),
				profile: { username: 'test' },
			}),
		);
	});

	it('should find by id', () => {
		expect(service.findById('123')).toEqual(
			expect.objectContaining({
				id: '123',
			}),
		);
	});
});
