import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { Document } from 'mongoose';
import { ImageDto } from 'shared-types/dist/ImageDto';
import { S3CacheService } from '../s3-cache/s3-cache.service';
import { S3Service } from '../s3/s3.service';

export interface DocumentWithImage extends Document {
	imageKey: string;
}

@Injectable()
export class ImagesService {
	constructor(
		private readonly s3CacheService: S3CacheService,
		private readonly s3Service: S3Service,
	) {}

	getObject(key: string) {
		return this.s3CacheService.getObject(key);
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
			const buffer = this.base64ToBuffer(dto.data);

			const oneMb = 1000000;
			const fileToLarge = buffer.byteLength > 5 * oneMb;

			if (fileToLarge) {
				throw new PayloadTooLargeException('Max image size is 5MB');
			}

			const key = await this.s3Service.uploadObject(buffer);
			return key;
		}

		return null;
	}

	private base64ToBuffer(base64: string) {
		return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	}
}
