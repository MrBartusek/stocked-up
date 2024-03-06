import { Test, TestingModule } from '@nestjs/testing';
import { ImageDto } from '../models/users/dto/image.dto';
import { S3CacheService } from '../s3-cache/s3-cache.service';
import { S3Service } from '../s3/s3.service';
import { DocumentWithImage, ImagesService } from './images.service';

const MOCK_IMAGE =
	'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/9+C3QAAAABJRU5ErkJggg==';
const MOCK_BASE64 = `data:image/png;base64,${MOCK_IMAGE}`;

describe('ImagesService', () => {
	let service: ImagesService;

	const mockS3CacheService = {
		getObject: jest.fn(() => 'object'),
	};

	const mockS3Service = {
		uploadObject: jest.fn(() => 'new-key'),
		deleteObject: jest.fn(),
	};

	const uploadObjectSpy = jest.spyOn(mockS3Service, 'uploadObject');
	const deleteObjectSpy = jest.spyOn(mockS3Service, 'deleteObject');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ImagesService,
				{
					provide: S3CacheService,
					useValue: mockS3CacheService,
				},
				{
					provide: S3Service,
					useValue: mockS3Service,
				},
			],
		}).compile();

		service = module.get<ImagesService>(ImagesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should passthrough getObject', async () => {
		const object = await service.getObject('key');
		expect(object).toEqual('object');
	});

	describe('Handle ImageDto and key', () => {
		it('should upload new image', async () => {
			const document = { imageKey: null } as DocumentWithImage;
			const dto: ImageDto = { hasImage: true, data: MOCK_BASE64 };

			const result = await service.handleImageDtoAndGetKey(document, dto);

			expect(result).toBe('new-key');
			expect(uploadObjectSpy).toHaveBeenCalledWith(expect.any(Buffer));
		});

		it('should replace image', async () => {
			const document = { imageKey: 'old-key' } as DocumentWithImage;
			const dto: ImageDto = { hasImage: true, data: MOCK_BASE64 };

			const result = await service.handleImageDtoAndGetKey(document, dto);

			expect(result).toBe('new-key');
			expect(deleteObjectSpy).toHaveBeenCalledWith('old-key');
		});

		it('should delete image', async () => {
			const document = { imageKey: 'old-key' } as DocumentWithImage;
			const dto: ImageDto = { hasImage: false };

			const result = await service.handleImageDtoAndGetKey(document, dto);

			expect(result).toBe(null);
			expect(deleteObjectSpy).toHaveBeenCalledWith('old-key');
		});

		it('should do nothing when no image', async () => {
			const document = { imageKey: null } as DocumentWithImage;
			const dto: ImageDto = { hasImage: false };

			const result = await service.handleImageDtoAndGetKey(document, dto);

			expect(result).toBe(null);
		});

		it('should keep already uploaded image', async () => {
			const document = { imageKey: 'test-key' } as DocumentWithImage;
			const dto: ImageDto = { hasImage: true };

			const result = await service.handleImageDtoAndGetKey(document, dto);

			expect(result).toBe('test-key');
		});
	});

	describe('Directly remove image', () => {
		it('should delete image directly', async () => {
			const document = { imageKey: 'old-key' } as DocumentWithImage;

			const result = await service.deleteImage(document);

			expect(result).toBe(true);
			expect(deleteObjectSpy).toHaveBeenCalledWith('old-key');
		});

		it('should not delete image directly if it does not exist', async () => {
			const document = { imageKey: null } as DocumentWithImage;

			const result = await service.deleteImage(document);

			expect(result).toBe(false);
			expect(deleteObjectSpy).toHaveBeenCalledTimes(0);
		});
	});
});
