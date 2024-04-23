import { Test, TestingModule } from '@nestjs/testing';
import * as sharp from 'sharp';
import { GravatarService } from './gravatar.service';

// Both of these e-mails are controlled by me
// So i can control if they are registered or not
const VALID_EMAIL = 'admin@dokurno.dev';
const INVALID_EMAIL = 'do-not-register@dokurno.dev';

describe('GravatarService', () => {
	let service: GravatarService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GravatarService],
		}).compile();

		service = module.get<GravatarService>(GravatarService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get avatar', async () => {
		const avatar = await service.getGravatarBuffer(VALID_EMAIL);
		const metadata = await sharp(avatar).metadata();

		expect(metadata.height).toBeGreaterThan(10);
		expect(metadata.width).toBeGreaterThan(10);
	});

	it('should return null on missing avatar', async () => {
		const avatar = await service.getGravatarBuffer(INVALID_EMAIL);
		expect(avatar).toBeNull();
	});
});
