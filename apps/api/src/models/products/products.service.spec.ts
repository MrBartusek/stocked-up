import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateProductDto } from 'shared-types';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ImagesService } from '../../images/images.service';

describe('ProductsService', () => {
	let service: ProductsService;

	const regularMockFindFunction = (id?: Types.ObjectId) => {
		return {
			_id: id,
			name: 'test-product',
			buyPrice: 10,
			sellPrice: 10,
		};
	};

	const mockProductsRepository = {
		create: jest.fn((dto: CreateProductDto) => {
			return dto;
		}),
		find: jest.fn(() => new Array(10).fill(() => regularMockFindFunction(new Types.ObjectId()))),
		findById: jest.fn((id: Types.ObjectId) => regularMockFindFunction(id)),
		deleteOneById: jest.fn((id: Types.ObjectId) => regularMockFindFunction(id)),
		exist: jest.fn(() => true),
		findOneByIdAndUpdate: jest.fn((id: Types.ObjectId, query: any) => ({
			...regularMockFindFunction(id),
			...query,
		})),
		countDocuments: jest.fn(() => 100),
	};

	const mockImagesService = {
		handleImageDtoAndGetKey: jest.fn(() => 'img-key'),
	};

	const handleImageDtoAndGetKeySpy = jest.spyOn(mockImagesService, 'handleImageDtoAndGetKey');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{
					provide: ProductsRepository,
					useValue: mockProductsRepository,
				},
				{
					provide: ImagesService,
					useValue: mockImagesService,
				},
			],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create product', () => {
		const product = service.create({
			organizationId: '123',
			name: 'created-product',
		});
		expect(product).toEqual(
			expect.objectContaining({
				name: 'created-product',
			}),
		);
	});

	it('should update product', async () => {
		const product = await service.update(new Types.ObjectId(), {
			organizationId: '123',
			name: 'updated-product',
			image: { hasImage: false },
		});
		expect(product).toEqual(
			expect.objectContaining({
				name: 'updated-product',
			}),
		);
		expect(handleImageDtoAndGetKeySpy).toBeCalled();
	});

	it('should delete product', () => {
		const product = service.delete(new Types.ObjectId());
		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
	});

	it('should find one product', () => {
		const product = service.findOne(new Types.ObjectId());
		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
	});

	it('should find all products', () => {
		const products = service.findAll(new Types.ObjectId());
		expect(products).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
				}),
			]),
		);
	});

	it('should count all products', () => {
		const count = service.countAll(new Types.ObjectId());
		expect(count).toBeGreaterThan(1);
	});
});
