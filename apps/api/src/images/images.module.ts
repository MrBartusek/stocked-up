import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { S3Service } from '../s3/s3.service';
import { S3CacheModule } from '../s3-cache/s3-cache.module';

@Module({
	controllers: [ImagesController],
	providers: [ImagesService],
	imports: [S3CacheModule],
})
export class ImagesModule {}
