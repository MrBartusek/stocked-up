import { Readable } from 'node:stream';
import Utils from './utils';

describe('Utils', () => {
	describe('isProduction', () => {
		it('should return true when NODE_ENV is set to production', () => {
			process.env.NODE_ENV = 'production';

			expect(Utils.isProduction()).toBeTruthy();
		});

		it('should return false when NODE_ENV is not set to production', () => {
			process.env.NODE_ENV = 'development';

			expect(Utils.isProduction()).toBeFalsy();
		});
	});

	describe('schemaSerializerHelper', () => {
		it('should return a valid schema serializer helper', () => {
			const schemaSerializerHelper = Utils.schemaSerializerHelper;

			expect(schemaSerializerHelper.toJSON).toHaveProperty('transform');
		});
	});

	describe('streamToBuffer', () => {
		it('should convert a stream to a buffer', async () => {
			const stream = new Readable();
			stream.push('Hello, ');
			stream.push('world!');
			stream.push(null);

			const result = await Utils.streamToBuffer(stream);
			expect(result.toString()).toBe('Hello, world!');
		});
	});
});
