import { Logger } from '@nestjs/common';
import Utils from '../helpers/utils';

if (Utils.isTest()) {
	jest.mock('ioredis', () => jest.requireActual('ioredis-mock'));
}

import Redis from 'ioredis';

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASS;
const port = process.env.REDIS_PORT as unknown as number;

const logger = new Logger('Redis');

const client = new Redis({
	keyPrefix: 'stocked-up:',
	password: password,
	port: port,
	host: host,
});

client.on('ready', () => {
	logger.log('Redis Connected!');
});

export default client;
