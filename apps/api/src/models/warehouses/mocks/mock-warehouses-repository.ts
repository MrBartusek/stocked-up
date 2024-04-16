import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { MockEntityRepository } from '../../../mocks/mock-entity-repository';
import { Warehouse } from '../schemas/warehouse.schema';

@Injectable()
export class MockWarehousesRepository extends MockEntityRepository<Warehouse> {
	constructor() {
		super({
			organization: new Types.ObjectId(),
			name: 'test-name',
			address: 'test-address',
		});
	}
}
