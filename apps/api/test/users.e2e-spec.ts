import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import NestSetup from '../src/setup';
import { setupTestUser } from './setup-user';
import { UpdateUserDto } from '../src/models/users/dto/update-user.dto';

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
		const res = await agent.get('/api/users/me');
		expect(res.body.email).toBe('test@dokurno.dev');
	});

	it('/users (PUT)', async () => {
		const dto: UpdateUserDto = {
			username: 'updated-username',
			image: { hasImage: false },
		};
		const res = await agent.put('/api/users').send(dto).expect(200);
		expect(res.body.username).toBe('updated-username');
	});
});
