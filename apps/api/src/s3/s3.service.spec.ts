import { NoSuchBucket, NoSuchKey } from '@aws-sdk/client-s3';
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';
import { S3Service } from './s3.service';

describe('S3Service', () => {
	let service: S3Service;

	const mockS3 = {
		putObject: jest.fn(),
		getObject: jest.fn(),
		deleteObject: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				S3Service,
				{
					provide: 'default_S3ModuleConnectionToken',
					useValue: mockS3,
				},
			],
		}).compile();
		service = module.get<S3Service>(S3Service);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should upload object', async () => {
		const buffer = Buffer.from('test');

		const key = await service.uploadObject(buffer);

		expect(key).toStrictEqual(expect.any(String));
		expect(mockS3.putObject).toBeCalledWith(expect.objectContaining({ Body: buffer }));
	});

	describe('Get object', () => {
		it('should retrieve object', async () => {
			const stream = Readable.from(['test']);
			mockS3.getObject.mockResolvedValue({ Body: stream });
			const object = await service.getObjectBody('key');
			expect(stream).toBe(object);
		});

		it('should return null on missing object', async () => {
			mockS3.getObject.mockRejectedValue(new NoSuchKey({} as any));
			const object = await service.getObjectBody('key');
			expect(object).toBeNull();
		});

		it('should throw on error', async () => {
			mockS3.getObject.mockRejectedValue(new NoSuchBucket({} as any));
			const object = service.getObjectBody('key');
			expect(object).rejects.toThrowError(NoSuchBucket);
		});
	});

	it('should delete object', async () => {
		await service.deleteObject('key-to-delete');
		expect(mockS3.deleteObject).toBeCalledWith(expect.objectContaining({ Key: 'key-to-delete' }));
	});
});
