import * as request from 'supertest';
import { CreateOrganizationDto } from '../src/models/organizations/dto/create-organization.dto';

export interface TestUserOptions {
	createOrganization?: boolean;
}

export async function setupTestUser(agent: request.SuperAgentTest, options: TestUserOptions = {}) {
	const payload = { username: 'test-user', email: 'test@dokurno.dev', password: 'Test123!' };

	await agent.post('/api/auth/register').send(payload);
	await agent.post('/api/auth/login').send(payload);

	if (options.createOrganization == true) {
		const dto: CreateOrganizationDto = {
			name: 'auto-mock-test-org',
			warehouse: {
				name: 'auto-mock-test-warehouse',
			},
		};
		await agent.post('/api/organizations').send(dto);
	}
}
