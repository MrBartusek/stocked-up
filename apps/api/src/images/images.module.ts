import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { S3Service } from '../s3/s3.service';

@Module({
	controllers: [ImagesController],
	providers: [ImagesService, S3Service],
	imports: [S3Module],
})
export class ImagesModule {}
