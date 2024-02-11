import { Test, TestingModule } from '@nestjs/testing';
import { AuthEmailsController } from './auth-emails.controller';

describe('AuthEmailsController', () => {
	let controller: AuthEmailsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthEmailsController],
		}).compile();

		controller = module.get<AuthEmailsController>(AuthEmailsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
