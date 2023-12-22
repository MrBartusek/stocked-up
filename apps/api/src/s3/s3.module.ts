import { Module } from '@nestjs/common';
import * as S3Lib from 'nestjs-s3';
import { S3Service } from './s3.service';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION } = process.env;

@Module({
	imports: [
		S3Lib.S3Module.forRoot({
			config: {
				credentials: {
					accessKeyId: AWS_ACCESS_KEY_ID,
					secretAccessKey: AWS_SECRET_ACCESS_KEY,
				},
				region: AWS_DEFAULT_REGION,
				forcePathStyle: true,
			},
		}),
	],
	providers: [S3Service],
	exports: [S3Service],
})
export class S3Module {}
