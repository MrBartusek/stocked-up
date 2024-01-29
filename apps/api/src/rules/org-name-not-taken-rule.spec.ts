import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from '../models/organizations/organizations.service';
import { OrganizationNameNotTakenRule } from './org-name-not-taken.rule';

describe('OrganizationNameNotTakenRule', () => {
	let rule: OrganizationNameNotTakenRule;

	const mockOrganizationsService = {
		nameTaken: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrganizationNameNotTakenRule,
				{
					provide: OrganizationsService,
					useValue: mockOrganizationsService,
				},
			],
		}).compile();

		rule = module.get<OrganizationNameNotTakenRule>(OrganizationNameNotTakenRule);
	});

	it('should be defined', () => {
		expect(rule).toBeDefined();
	});

	it('should return true if org name is not taken', async () => {
		mockOrganizationsService.nameTaken.mockResolvedValue(false);

		const result = await rule.validate('test');

		expect(result).toBe(true);
	});

	it('should return false if org name is taken', async () => {
		mockOrganizationsService.nameTaken.mockResolvedValue(true);

		const result = await rule.validate('test');

		expect(result).toBe(false);
	});

	it('should return default error message if email is taken', () => {
		const defaultMessage = rule.defaultMessage();

		expect(defaultMessage).toContain('taken');
	});
});
