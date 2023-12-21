import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { S3CacheService } from '../s3-cache/s3-cache.service';

@Injectable()
export class ImagesService {
	constructor(private readonly s3CacheService: S3CacheService) {}

	getObject(key: string) {
		return this.s3CacheService.getObject(key);
	}
}
