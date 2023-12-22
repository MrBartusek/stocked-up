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

		if (dto.hasImage && !documentHasImage) {
			if (!dto.data) {
				throw new BadRequestException(
					'Malformed ImageDto, object does not have and image, data property expected',
				);
			}
			return this.uploadBase64(dto.data);
		} else if (!dto.hasImage && documentHasImage) {
			await this.s3Service.deleteObject(document.imageKey);
			return null;
		} else if (dto.hasImage && documentHasImage && dto.data) {
			await this.s3Service.deleteObject(document.imageKey);
			return this.uploadBase64(dto.data);
		}
	}

	private async uploadBase64(base64: string) {
		const buffer = Buffer.from(base64, 'base64');
		const key = await this.s3Service.uploadObject(buffer);
		return key;
	}
}
