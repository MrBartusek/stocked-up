import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { S3CacheService } from '../s3-cache/s3-cache.service';
import { Document } from 'mongoose';
import { ImageDto } from 'shared-types/dist/ImageDto';

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
			return this.uploadBase64(dto.data);
		}
		return null;
	}

	private base64ToBuffer(base64: string) {
		return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	}

	private async uploadBase64(base64: string) {
		const buffer = this.base64ToBuffer(base64);
		const key = await this.s3Service.uploadObject(buffer);
		return key;
	}
}
