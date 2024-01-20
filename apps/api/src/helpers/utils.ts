import { Logger } from '@nestjs/common';
import { SchemaOptions } from '@nestjs/mongoose';
import { Readable } from 'node:stream';

const logger = new Logger('Utils');

class Utils {
	public static isProduction(): boolean {
		const { NODE_ENV } = process.env;
		return NODE_ENV == 'production';
	}

	public static isTest(): boolean {
		const { JEST_WORKER_ID } = process.env;
		return JEST_WORKER_ID !== undefined;
	}

	public static getApiBaseUrl(): string {
		const { BASE_API_URL } = process.env;
		const API_BASE_URL_REGEX = /^https?:\/\/.*api\/?$/;
		if (BASE_API_URL) {
			const isValid = API_BASE_URL_REGEX.test(BASE_API_URL);
			if (!isValid) {
				logger.warn('Configured BASE_API_URL does not seam valid, please check your .env file');
			}
			return BASE_API_URL.endsWith('/') ? BASE_API_URL : BASE_API_URL + '/';
		}

		if (!Utils.isProduction()) return 'http://localhost:5173/api/';

		logger.error('BASE_API_URL have not been provided. Failed to retrieve absolute base URL');
		return '/api';
	}

	public static get schemaSerializerHelper(): SchemaOptions {
		return {
			toJSON: {
				transform: function (doc, ret) {
					ret.id = ret._id;
					delete ret._id;
					delete ret.__v;
				},
			},
		};
	}

	public static async streamToBuffer(stream: Readable) {
		const chunks = [];
		for await (const chunk of stream) {
			chunks.push(chunk);
		}
		return Buffer.concat(chunks);
	}

	public static randomRange(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default Utils;
