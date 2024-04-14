import { Test, TestingModule } from '@nestjs/testing';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { UsersService } from '../models/users/users.service';
import { SecurityValidationPipe } from './pipes/security-validation.pipe';
import { MockSecurityPipe } from '../mocks/mock-security.pipe';
import { CreateSecurityRuleDto } from './dto/create-security-rule.dto';
import { Types } from 'mongoose';
import { HasOrganizationAccessPipe } from './pipes/has-organization-access.pipe';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SecurityController', () => {
	let controller: SecurityController;

	const mockSecurityService = {
		addRule: jest.fn(),
	};

	const mockUserService = {
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SecurityController],
			providers: [SecurityService, UsersService],
		})
			.overrideProvider(SecurityService)
			.useValue(mockSecurityService)
			.overrideProvider(UsersService)
			.useValue(mockUserService)
			.overridePipe(SecurityValidationPipe)
			.useValue(MockSecurityPipe)
			.overridePipe(HasOrganizationAccessPipe)
			.useValue(MockSecurityPipe)
			.compile();

		controller = module.get<SecurityController>(SecurityController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create rule', () => {
		it('should create security rule', async () => {
			const orgId = new Types.ObjectId();
			const userId = new Types.ObjectId();
			mockUserService.findOne.mockResolvedValue({ _id: userId });
			mockSecurityService.addRule.mockImplementation((orgId) => ({
				_id: orgId,
			}));

			const dto: CreateSecurityRuleDto = {
				organization: orgId.toString(),
				email: 'test@dokurno.dev',
			};

			await controller.create(dto);

			expect(mockSecurityService.addRule).toHaveBeenCalledWith(orgId, userId);
		});

		it('should not create security rule on invalid e-mail', async () => {
			mockUserService.findOne.mockResolvedValue(null);

			const dto: CreateSecurityRuleDto = {
				organization: new Types.ObjectId().toString(),
				email: 'invalid@dokurno.dev',
			};
			const result = controller.create(dto);

			expect(result).rejects.toThrowError(NotFoundException);
		});
	});
});
