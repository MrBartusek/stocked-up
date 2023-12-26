import DtoHelper from './dto.helper';

describe('DtoHelpers', () => {
	describe('getImageDto', () => {
		it('should return ImageDto with default key when no key is provided', () => {
			const result = DtoHelper.getImageDto();
			expect(result.hasImage).toBeFalsy();
			expect(result.url).toBe('http://localhost:5173/api/images/default');
		});

		it('should return ImageDto with the provided key', () => {
			const result = DtoHelper.getImageDto('customKey');
			expect(result.hasImage).toBeTruthy();
			expect(result.url).toBe('http://localhost:5173/api/images/customKey');
		});
	});
});
