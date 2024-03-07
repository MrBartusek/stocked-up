import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ImagesService } from '../../images/images.service';
import { MockProductsRepository } from './mocks/mock-products-repository';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
	let service: ProductsService;

	const mockProductsRepository = new MockProductsRepository();

	const mockImagesService = {
		handleImageDtoAndGetKey: jest.fn(() => 'img-key'),
		deleteImage: jest.fn(),
	};

	const mockEventEmitter = {
		emit: jest.fn(),
	};

	const handleImageDtoSpy = jest.spyOn(mockImagesService, 'handleImageDtoAndGetKey');
	const deleteImageSpy = jest.spyOn(mockImagesService, 'deleteImage');
	const emitSpy = jest.spyOn(mockEventEmitter, 'emit');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{
					provide: EventEmitter2,
					useValue: mockEventEmitter,
				},
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

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create product', async () => {
		const product = await service.create({
			organization: new Types.ObjectId().toString(),
			buyPrice: 0,
			sellPrice: 0,
			name: 'created-product',
		});

		expect(product).toEqual(
			expect.objectContaining({
				name: 'created-product',
			}),
		);
		expect(emitSpy).toHaveBeenCalledWith('product.created', expect.anything());
	});

	it('should update product', async () => {
		const product = await service.update(new Types.ObjectId(), {
			organization: new Types.ObjectId().toString(),
			name: 'updated-product',
			buyPrice: 0,
			sellPrice: 0,
			image: { hasImage: false },
		});

		expect(product).toEqual(
			expect.objectContaining({
				name: 'updated-product',
			}),
		);
		expect(handleImageDtoSpy).toBeCalled();
		expect(emitSpy).toHaveBeenCalledWith('product.updated', expect.anything());
	});

	it('should delete product', async () => {
		const product = await service.delete(new Types.ObjectId());

		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
		expect(deleteImageSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				imageKey: 'image-key',
			}),
		);
		expect(emitSpy).toHaveBeenCalledWith('product.deleted', expect.anything());
	});

	it('should find one product', async () => {
		const product = await service.findOne(new Types.ObjectId());
		expect(product).toEqual(
			expect.objectContaining({
				name: expect.any(String),
			}),
		);
	});

	it('should paginate all products', async () => {
		const products = await service.paginate(new Types.ObjectId(), { page: 1 });

		expect(products.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: expect.any(String),
				}),
			]),
		);
	});

	it('should count all products', async () => {
		const count = await service.countAll(new Types.ObjectId());

		expect(count).toBeGreaterThan(1);
	});
});
