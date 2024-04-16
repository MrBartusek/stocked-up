import { Types } from 'mongoose';
import { MockEntityRepository } from '../../../mocks/mock-entity-repository';
import { Product } from '../schemas/product.schema';

export class MockProductsRepository extends MockEntityRepository<Product> {
	constructor() {
		super({
			name: 'test-product',
			buyPrice: 10,
			sellPrice: 10,
			imageKey: 'image-key',
			organization: new Types.ObjectId() as any,
			sku: 'TEST-SKU',
			description: 'test',
			unit: 'part',
		});
	}
}
