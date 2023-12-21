import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import client from './connect';

@Module({
	providers: [{ provide: 'CLIENT', useValue: client }, RedisService],
	exports: [RedisService],
})
export class RedisModule {}
