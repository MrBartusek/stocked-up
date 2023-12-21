import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

throw new Error('no');

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASS;
const port = process.env.REDIS_PORT as unknown as number;

const logger = new Logger('Redis');

const client = new Redis({
	password: password,
	port: port,
	host: host,
});

client.on('ready', () => {
	logger.log('Redis Connected!');
});

export default client;
