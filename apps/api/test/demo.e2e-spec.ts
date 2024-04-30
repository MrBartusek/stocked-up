import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import NestSetup from '../src/setup';

describe('DemoController (e2e)', () => {
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

	it('/demo/register (POST)', async () => {
		const res = await agent.post('/api/demo/register').expect(201);

		const emailRegex = /^demo-.+@dokurno\.dev$/;
		expect(res.body.email).toMatch(emailRegex);

		return agent
			.post('/api/auth/login')
			.send({ username: res.body.username, password: 'xxxx' })
			.expect(200);
	});

	it('should create mock organization', async () => {
		const res = await agent.get('/api/organizations').expect(200);

		expect(res.body.items[0].warehouses).toHaveLength(4);
	});
});
