import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ImagesService {
	constructor(private readonly s3Service: S3Service) {}

	getImageUrlByKey(key: string): Promise<string | null> {
		return this.s3Service.getObjectUrl(key);
	}
}
