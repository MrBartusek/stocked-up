import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import NestSetup from '../src/setup';
import { setupTestUser } from './setup-user';

describe('UsersController (e2e)', () => {
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
		await setupTestUser(agent);
	});

	it('/users/me (GET)', async () => {
		return agent.get('/api/users/me').then((res) => {
			expect(res.body.email).toBe('test@dokurno.dev');
		});
	});
});
