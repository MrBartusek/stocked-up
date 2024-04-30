import * as request from 'supertest';

export async function setupTestUser(agent: request.SuperAgentTest) {
	const payload = { username: 'test-user', email: 'test@dokurno.dev', password: 'Test123!' };

	await agent.post('/api/auth/register').send(payload);
	await agent.post('/api/auth/login').send(payload);
}
