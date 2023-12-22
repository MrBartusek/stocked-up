import { Module } from '@nestjs/common';
import { S3CacheModule } from '../s3-cache/s3-cache.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { S3Module } from '../s3/s3.module';

@Module({
	controllers: [ImagesController],
	providers: [ImagesService],
	imports: [S3CacheModule, S3Module],
	exports: [ImagesService],
})
export class ImagesModule {}
