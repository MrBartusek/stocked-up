import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
	constructor(@Inject('CLIENT') private readonly _client: Redis) {}

	get client(): Redis {
		return this._client;
	}
}
