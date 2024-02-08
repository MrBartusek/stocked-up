import { BadRequestException } from '@nestjs/common';
import { PageQueryValidationPipe } from './page-query-validation.pipe';

describe('PageQueryValidationPipe', () => {
	/**
	 * This test suite doesn't use @nestjs/testing for testing since
	 * tested pipe is re-created in every suite. This can probably be
	 * done with this lib but, I don't see a simple way to do that
	 */

	it('should pass on valid unrestricted DTO', () => {
		const pipe = new PageQueryValidationPipe();
		const result = pipe.transform({ page: 1, orderBy: 'name' });
		expect(result.page).toBe(1);
	});

	it('should pass on valid restricted DTO', () => {
		const pipe = new PageQueryValidationPipe({
			disableTextSearch: true,
			allowedFilters: ['name'],
		});
		const result = pipe.transform({ page: 1, orderBy: 'name' });
		expect(result.page).toBe(1);
	});

	it('should fail on invalid filter', () => {
		const pipe = new PageQueryValidationPipe({
			allowedFilters: ['name'],
		});
		expect(() => pipe.transform({ page: 1, orderBy: 'price' })).toThrow(BadRequestException);
	});

	it('should fail on disabled orderBy', () => {
		const pipe = new PageQueryValidationPipe({
			disableOrderBy: true,
		});
		expect(() => pipe.transform({ page: 1, orderBy: 'name' })).toThrow(BadRequestException);
	});

	it('should fail on disabled text search', () => {
		const pipe = new PageQueryValidationPipe({
			disableTextSearch: true,
		});
		expect(() => pipe.transform({ page: 1, search: 'test' })).toThrow(BadRequestException);
	});
});
