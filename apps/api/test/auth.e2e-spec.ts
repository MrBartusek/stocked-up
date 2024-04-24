import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureNestTestApp } from './configure-test-app';

describe('AuthController (e2e)', () => {
	let app: NestExpressApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication<NestExpressApplication>();
		configureNestTestApp(app);
		await app.init();
	});

	it('/auth/register (POST)', async () => {
		const payload = { username: 'test-user', email: 'test@dokurno.dev', password: 'Test123!' };

		const test = await request(app.getHttpServer())
			.post('/api/auth/register')
			.send(payload)
			.expect(200);

		expect(test.body.email).toBe('test@dokurno.dev');
	});

	it('/auth/login (POST)', async () => {
		const payload = { username: 'test-user', password: 'Test123!' };

		return request(app.getHttpServer()).post('/api/auth/login').send(payload).expect(200);
	});
});
