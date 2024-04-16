import { Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { PageQueryDto } from '../../../dto/page-query.dto';
import { MockEntityRepository } from '../../../mocks/mock-entity-repository';
import { ProductDocument } from '../../products/schemas/product.schema';
import { InventoryItem } from '../schemas/inventory-item.schema';

@Injectable()
export class MockInventoryRepository extends MockEntityRepository<InventoryItem> {
	private mockProduct: ProductDocument;

	constructor() {
		super({
			organization: new Types.ObjectId(),
			warehouse: new Types.ObjectId(),
			product: new Types.ObjectId(),
			quantity: 100,
			location: 'Bin 1A',
		});
		this.mockProduct = {
			_id: new Types.ObjectId(),
			name: 'test-product',
			buyPrice: 10,
			sellPrice: 10,
			imageKey: 'image-key',
			organization: new Types.ObjectId() as any,
			sku: 'TEST-SKU',
			description: 'test',
			unit: 'part',
		} as ProductDocument;
	}

	async findAndAggregateWithProduct() {
		const products = await this.find();
		return products.map((i) => ({
			...i,
			product: this.mockProduct,
		}));
	}

	async aggregateWithProductAndPaginate(
		entityFilterQuery: FilterQuery<InventoryItem>,
		pageQueryDto: PageQueryDto<any>,
	) {
		const paginatedProducts = await this.paginate(entityFilterQuery, pageQueryDto);
		paginatedProducts.items = paginatedProducts.items.map((i) => ({
			...i,
			product: this.mockProduct,
		}));
		return paginatedProducts;
	}

	async calculateTotalWarehouseValue(): Promise<number> {
		return 100;
	}
}
