import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../models/users/users.service';
import { EmailNotTakenRule } from './email-not-taken.rule';

describe('EmailNotTakenRule', () => {
	let rule: EmailNotTakenRule;

	const usersServiceMock = {
		isEmailTaken: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmailNotTakenRule,
				{
					provide: UsersService,
					useValue: usersServiceMock,
				},
			],
		}).compile();

		rule = module.get<EmailNotTakenRule>(EmailNotTakenRule);
	});

	it('should be defined', () => {
		expect(rule).toBeDefined();
	});

	it('should return true if email is not taken', async () => {
		usersServiceMock.isEmailTaken.mockResolvedValue(false);

		const result = await rule.validate('new@example.com');

		expect(result).toBe(true);
	});

	it('should return false if email is taken', async () => {
		usersServiceMock.isEmailTaken.mockResolvedValue(true);

		const result = await rule.validate('taken@example.com');

		expect(result).toBe(false);
	});

	it('should return default error message if email is taken', () => {
		const defaultMessage = rule.defaultMessage();

		expect(defaultMessage).toContain('taken');
	});
});
