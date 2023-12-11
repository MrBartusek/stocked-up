import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from './prase-object-id.pipe';

describe('ParseObjectIdPipe', () => {
	let parseObjectIdPipe: ParseObjectIdPipe;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ParseObjectIdPipe],
		}).compile();

		parseObjectIdPipe = module.get<ParseObjectIdPipe>(ParseObjectIdPipe);
	});

	it('should be defined', () => {
		expect(parseObjectIdPipe).toBeDefined();
	});

	it('should transform valid ObjectId string', () => {
		const validObjectId = new Types.ObjectId().toString();
		const result = parseObjectIdPipe.transform(validObjectId, { type: 'param', data: 'id' });

		expect(result).toBeInstanceOf(Types.ObjectId);
		expect(result.toHexString()).toBe(validObjectId);
	});

	it('should throw BadRequestException for null value', () => {
		expect(() => parseObjectIdPipe.transform(null, { type: 'param', data: 'id' })).toThrowError(
			BadRequestException,
		);
	});

	it('should throw BadRequestException for invalid ObjectId string', () => {
		const invalidObjectId = 'invalidObjectId';

		expect(() =>
			parseObjectIdPipe.transform(invalidObjectId, { type: 'param', data: 'id' }),
		).toThrowError(BadRequestException);
	});
});
