import { Injectable, Logger } from '@nestjs/common';
import { Readable } from 'stream';
import Utils from '../helpers/utils';
import { RedisService } from '../redis/redis.service';
import { S3Service } from '../s3/s3.service';

const ONE_DAY = 24 * 60 * 60;
const REDIS_PREFIX = 's3-cache:';
const CACHE_TIME = 30 * ONE_DAY;

export { REDIS_PREFIX as S3_CACHE_REDIS_PREFIX };

@Injectable()
export class S3CacheService {
	private readonly logger = new Logger(S3CacheService.name);

	constructor(
		private readonly s3: S3Service,
		private readonly redis: RedisService,
	) {}

	async getObject(key: string): Promise<Readable | null> {
		const cachedObject = await this.getCachedObject(key);
		if (cachedObject) {
			return cachedObject;
		}

		const object = await this.s3.getObjectBody(key);
		if (!object) return null;

		await this.cacheObject(key, object);
		const newObject = await this.getCachedObject(key);
		return newObject;
	}

	private async getCachedObject(key: string): Promise<Readable | null> {
		const redisKey = this.generateKey(key);

		const exist = await this.redis.client.exists(redisKey);
		if (exist == 0) return null;

		const cachedObject = await this.redis.client.getBuffer(redisKey);
		const stream = Readable.from(cachedObject);
		return stream;
	}

	private async cacheObject(key: string, object: Readable): Promise<void> {
		const redisKey = this.generateKey(key);

		const buffer = await Utils.streamToBuffer(object);
		await this.redis.client.set(redisKey, buffer);
		await this.redis.client.expire(redisKey, CACHE_TIME);
		this.logger.log(`Cached s3 object with key "${key}" for ${CACHE_TIME}s`);
	}

	private generateKey(key: string) {
		return `${REDIS_PREFIX}${key}`;
	}
}
