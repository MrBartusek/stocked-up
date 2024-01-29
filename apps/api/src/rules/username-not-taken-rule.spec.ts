import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../models/users/users.service';
import { UsernameNotTakenRule } from './username-not-taken.rule copy';

describe('UsernameNotTakenRule', () => {
	let rule: UsernameNotTakenRule;

	const usersServiceMock = {
		isUsernameTaken: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsernameNotTakenRule,
				{
					provide: UsersService,
					useValue: usersServiceMock,
				},
			],
		}).compile();

		rule = module.get<UsernameNotTakenRule>(UsernameNotTakenRule);
	});

	it('should be defined', () => {
		expect(rule).toBeDefined();
	});

	it('should return true if username is not taken', async () => {
		usersServiceMock.isUsernameTaken.mockResolvedValue(false);

		const result = await rule.validate('new@example.com');

		expect(result).toBe(true);
	});

	it('should return false if username is taken', async () => {
		usersServiceMock.isUsernameTaken.mockResolvedValue(true);

		const result = await rule.validate('taken@example.com');

		expect(result).toBe(false);
	});

	it('should return default error message if email is taken', () => {
		const defaultMessage = rule.defaultMessage();

		expect(defaultMessage).toContain('taken');
	});
});
