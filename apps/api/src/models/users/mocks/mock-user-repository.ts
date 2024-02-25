import { MockEntityRepository } from '../../../mocks/mock-entity-repistory';
import { User } from '../schemas/user.schema';

export class MockUserRepository extends MockEntityRepository<User> {
	constructor() {
		super({
			profile: {
				username: 'test',
				email: 'test@dokurno.dev',
				imageKey: 'test-image-key',
			},
			auth: {
				password: 'xxxxxxxxx',
			},
		});
	}
}
