import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('DemoController', () => {
	let controller: DemoController;

	const mockDemoService = {
		setupDemoAccount: jest.fn(() => ({
			profile: {
				username: 'Demo',
				email: 'demo-xxxxx@dokurno.dev',
				imageKey: null,
				isDemo: true,
				isConfirmed: true,
			},
		})),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DemoController],
			providers: [DemoService],
		})
			.overrideProvider(DemoService)
			.useValue(mockDemoService)
			.compile();

		controller = module.get<DemoController>(DemoController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create demo account', () => {
		expect(controller.createDemo()).resolves.toStrictEqual(
			expect.objectContaining({
				email: expect.stringContaining('@dokurno.dev'),
				isDemo: true,
			}),
		);
	});
});
