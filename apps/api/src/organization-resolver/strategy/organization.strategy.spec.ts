import { OrganizationStrategy } from './organization.strategy';
import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

describe('OrganizationStrategy', () => {
	let strategy: OrganizationStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OrganizationStrategy],
		}).compile();
		strategy = module.get<OrganizationStrategy>(OrganizationStrategy);
	});

	it('should return the same ID as provided', async () => {
		const id = new Types.ObjectId();

		const result = await strategy.resolve(id);

		expect(result).toEqual(id);
	});
});
