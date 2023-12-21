import { ImageDto } from 'shared-types/dist/ImageDto';
import Utils from './utils';

class DtoHelpers {
	public static getImageDto(key?: string): ImageDto {
		const hasImage = key != undefined;
		const url = Utils.getApiBaseUrl() + `images/${key || 'default'}`;
		return { hasImage: true, url };
	}
}

export default DtoHelpers;
