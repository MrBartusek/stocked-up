import { BadRequestException, Injectable, Logger, PayloadTooLargeException } from '@nestjs/common';
import * as sharp from 'sharp';
import { ImageDto } from '../models/users/dto/image.dto';
import { S3CacheService } from '../s3-cache/s3-cache.service';
import { S3Service } from '../s3/s3.service';

export interface DocumentWithImage {
	imageKey: string;
}

@Injectable()
export class ImagesService {
	constructor(
		private readonly s3CacheService: S3CacheService,
		private readonly s3Service: S3Service,
	) {}

	private readonly logger = new Logger(ImagesService.name);

	getObject(key: string) {
		return this.s3CacheService.getObject(key);
	}

	async deleteImage(document: DocumentWithImage): Promise<boolean> {
		if (document.imageKey) {
			await this.s3Service.deleteObject(document.imageKey);
			return true;
		}
		return false;
	}

	async handleImageDtoAndGetKey(
		document: DocumentWithImage,
		dto: ImageDto,
	): Promise<string | null> {
		const documentHasImage = document.imageKey != null;
		const newImageReceived = dto.data != null;

		const shouldUploadImage = dto.hasImage && newImageReceived;
		const shouldDeleteImage = documentHasImage && (shouldUploadImage || !dto.hasImage);

		if (shouldDeleteImage) {
			await this.s3Service.deleteObject(document.imageKey);
		}

		if (shouldUploadImage) {
			return this.uploadBase64(dto.data);
		}

		const imageWasDeleted = shouldDeleteImage;
		if (imageWasDeleted) {
			return null;
		} else if (documentHasImage) {
			return document.imageKey;
		}
		return null;
	}

	public async uploadImage(image: Buffer): Promise<string> {
		this.validateImageThrowIfInvalid(image);

		const processImage = await this.processImage(image).catch((error) => {
			this.logger.warn('Sharp image processing failed', error);
			throw new BadRequestException('Image processing failed');
		});

		return this.s3Service.uploadObject(processImage);
	}

	private async uploadBase64(base64: string): Promise<string> {
		const buffer = this.base64ToBuffer(base64);
		return this.uploadImage(buffer);
	}

	private validateImageThrowIfInvalid(buffer: Buffer): void {
		const oneMb = 1000000;
		const fileToLarge = buffer.byteLength > 5 * oneMb;

		if (fileToLarge) {
			throw new PayloadTooLargeException('Max image size is 5MB');
		}
	}

	private processImage(buffer: Buffer): Promise<Buffer> {
		return sharp(buffer).resize(256, 256, { fit: 'cover' }).png().toBuffer();
	}

	private base64ToBuffer(base64: string) {
		return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	}
}
