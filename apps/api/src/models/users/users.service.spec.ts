import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	const mockUserRepository = {
		create: jest.fn((dto) => {
			return {
				id: '123',
				...dto,
			};
		}),
		findOne: jest.fn((query) => {
			return {
				id: '123',
				profile: {
					username: query['profile.username'],
				},
			};
		}),
		findById: jest.fn((id) => {
			return {
				id,
			};
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UserRepository,
					useValue: mockUserRepository,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create user', () => {
		expect(
			service.create({ username: 'test', email: 'test@dokurno.dev', passwordHash: 'test' }),
		).toEqual({
			id: expect.any(String),
			profile: { username: expect.any(String), email: expect.any(String) },
			auth: { password: expect.any(String) },
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
