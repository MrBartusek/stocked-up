import Utils from './utils';

class DtoHelpers {
	public static getImageUrl(key?: string): string {
		return Utils.getApiBaseUrl() + `images/${key || 'default'}`;
	}
}

export default DtoHelpers;
