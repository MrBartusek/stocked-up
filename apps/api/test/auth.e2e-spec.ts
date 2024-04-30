import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import NestSetup from '../src/setup';

describe('AuthController (e2e)', () => {
	let app: NestExpressApplication;
	let agent: request.SuperAgentTest;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication<NestExpressApplication>();
		NestSetup.configureNestApp(app);
		await app.init();

		agent = request.agent(app.getHttpServer());
	});

	it('/auth/register (POST)', async () => {
		const payload = { username: 'test-user', email: 'test@dokurno.dev', password: 'Test123!' };

		return agent
			.post('/api/auth/register')
			.send(payload)
			.expect(200)
			.then((res) => {
				expect(res.body.email).toBe('test@dokurno.dev');
			});
	});

	it('/auth/login (POST)', async () => {
		const payload = { username: 'test-user', password: 'Test123!' };

		return agent
			.post('/api/auth/login')
			.send(payload)
			.expect('set-cookie', /connect.sid/)
			.expect(200);
	});

	it('/auth/logout (POST)', async () => {
		return agent.post('/api/auth/logout').expect(200);
	});
});
