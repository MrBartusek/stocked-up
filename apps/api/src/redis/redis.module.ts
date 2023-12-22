import { Module } from '@nestjs/common';
import client from './connect';
import { RedisService } from './redis.service';

@Module({
	providers: [{ provide: 'CLIENT', useValue: client }, RedisService],
	exports: [RedisService],
})
export class RedisModule {}
