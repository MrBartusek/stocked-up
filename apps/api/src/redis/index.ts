import Redis from 'ioredis';

const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASS;
const port = process.env.REDIS_PORT as unknown as number;

const client = new Redis({
	password: password,
	port: port,
	host: host,
});

client.on('ready', () => {
	console.log('Redis Connected!');
});

export default client;
