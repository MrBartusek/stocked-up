import {
	DeleteObjectCommandInput,
	GetObjectCommandInput,
	PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import * as crypto from 'node:crypto';
import { Readable } from 'node:stream';

const { AWS_BUCKET_NAME } = process.env;

@Injectable()
export class S3Service {
	constructor(@InjectS3() private readonly s3: S3) {}

	private readonly logger = new Logger(S3Service.name);

	async uploadObject(file: Buffer): Promise<string> {
		const key = this.generateFileKey();
		const params: PutObjectCommandInput = {
			Bucket: AWS_BUCKET_NAME,
			Body: file,
			Key: key,
		};

		await this.s3.putObject(params);

		this.logger.log(`Uploaded S3 object with key: ${key}`);
		return key;
	}

	async getObjectBody(key: string): Promise<Readable | null> {
		const params: GetObjectCommandInput = {
			Bucket: AWS_BUCKET_NAME,
			Key: key,
		};

		const object = await this.s3.getObject(params);
		const body = object.Body as Readable;
		return body;
	}

	async deleteObject(key: string): Promise<void> {
		const params: DeleteObjectCommandInput = {
			Bucket: AWS_BUCKET_NAME,
			Key: key,
		};

		await this.s3.deleteObject(params);
		this.logger.log(`Deleted S3 object with key: ${key}`);
	}

	private generateFileKey(bytes = 32) {
		return crypto.randomBytes(bytes).toString('hex');
	}
}
