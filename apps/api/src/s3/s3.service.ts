import {
	DeleteObjectCommandInput,
	GetObjectCommand,
	PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import * as crypto from 'node:crypto';

const { AWS_BUCKET_NAME } = process.env;

const SINGED_URL_EXPIRE = 24 * 60 * 60;

@Injectable()
export class S3Service {
	constructor(@InjectS3() private readonly s3: S3) {}

	async uploadFile(file: Express.Multer.File): Promise<string> {
		const key = this.generateFileKey();
		const params: PutObjectCommandInput = {
			Bucket: AWS_BUCKET_NAME,
			Body: file.buffer,
			Key: key,
		};

		await this.s3.putObject(params);
		return key;
	}

	async getObjectUrl(key: string): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: AWS_BUCKET_NAME,
			Key: key,
		});

		const url = await getSignedUrl(this.s3, command, { expiresIn: SINGED_URL_EXPIRE });
		return url;
	}

	async deleteFile(key: string): Promise<void> {
		const params: DeleteObjectCommandInput = {
			Bucket: AWS_BUCKET_NAME,
			Key: key,
		};

		await this.s3.deleteObject(params);
	}

	private generateFileKey(bytes = 32) {
		return crypto.randomBytes(bytes).toString('hex');
	}
}
