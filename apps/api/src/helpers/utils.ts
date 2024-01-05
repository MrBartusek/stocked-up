import { BadRequestException, Logger } from '@nestjs/common';
import { SchemaOptions } from '@nestjs/mongoose';
import { Readable } from 'node:stream';
import { PageQueryDto } from 'shared-types';

const logger = new Logger('Utils');

class Utils {
	public static isProduction(): boolean {
		const { NODE_ENV } = process.env;
		return NODE_ENV == 'production';
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

	public static validatePageQueryFilter<T = any>(
		pageQuery: PageQueryDto<T>,
		allowedFilter: (keyof T)[],
	) {
		if (typeof pageQuery.orderBy != 'string') {
			throw new BadRequestException('orderBy must be string!');
		}

		const hasProhibitedFilters = !allowedFilter.includes(pageQuery.orderBy);

		if (pageQuery.orderBy && hasProhibitedFilters) {
			throw new BadRequestException(
				`This resource cant be filtered by ${pageQuery.orderBy}! ` +
					`Allowed filters are: ${allowedFilter.join(', ')}`,
			);
		}
	}
}

export default Utils;
