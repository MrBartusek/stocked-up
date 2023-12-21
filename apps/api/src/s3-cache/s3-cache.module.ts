import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { RedisModule } from '../redis/redis.module';
import { S3Service } from '../s3/s3.service';
import { S3CacheService } from './s3-cache.service';

@Module({
	imports: [S3Module, RedisModule],
	providers: [S3CacheService, S3Service],
	exports: [S3CacheService],
})
export class S3CacheModule {}
