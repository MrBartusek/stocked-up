import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
	constructor(@Inject('CLIENT') private readonly client: Redis) {}

	getClient(): Redis {
		return this.client;
	}
}
