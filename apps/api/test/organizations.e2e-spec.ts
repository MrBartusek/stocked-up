import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDto } from 'shared-types';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateOrganizationDto } from '../src/models/organizations/dto/create-organization.dto';
import { PatchOrganizationSettingsDto } from '../src/models/organizations/dto/path-organization-settings.dto';
import { UpdateOrganizationDto } from '../src/models/organizations/dto/update-organization.dto';
import NestSetup from '../src/setup';
import { setupTestUser } from './setup-user';

describe('OrganizationsController (e2e)', () => {
	let app: NestExpressApplication;
	let agent: request.SuperAgentTest;

	let createdOrganizationId: string;

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

	it('/organizations (POST)', async () => {
		const dto: CreateOrganizationDto = {
			name: 'test-org',
			warehouse: {
				name: 'test-warehouse',
				address: 'test-address',
			},
		};
		const res = await agent.post('/api/organizations').send(dto).expect(201);
		expect(res.body.name).toBe('test-org');
		createdOrganizationId = res.body.id;
	});

	it('/organizations (GET)', async () => {
		const res = await agent.get('/api/organizations').expect(200);
		const lastOrg: OrganizationDto = res.body.items[0];
		expect(lastOrg.name).toBe('test-org');
		expect(lastOrg.id).toBe(createdOrganizationId);
	});

	it('/organizations/:id (GET)', async () => {
		const res = await agent.get(`/api/organizations/${createdOrganizationId}`).expect(200);
		expect(res.body.name).toBe('test-org');
		expect(res.body.id).toBe(createdOrganizationId);
	});

	it('/organizations/:id (PUT)', async () => {
		const dto: UpdateOrganizationDto = { name: 'updated-org' };

		await agent.put(`/api/organizations/${createdOrganizationId}`).send(dto).expect(200);
		const res = await agent.get(`/api/organizations/${createdOrganizationId}`).expect(200);

		expect(res.body.name).toBe('updated-org');
	});

	it('/organizations/:id/settings (PATCH)', async () => {
		const dto: PatchOrganizationSettingsDto = { currency: 'PLN' };

		const res = await agent
			.patch(`/api/organizations/${createdOrganizationId}/settings`)
			.send(dto)
			.expect(200);

		expect(res.body.currency).toBe('PLN');
	});

	it('/organizations/:id (DELETE)', async () => {
		await agent.delete(`/api/organizations/${createdOrganizationId}`).expect(200);

		// We actually test for code 403 here since when organization is not found it
		// throws 403 instead of 404
		await agent.get(`/api/organizations/${createdOrganizationId}`).expect(403);
	});
});
