import { ImageDto } from '../models/users/dto/image.dto';
import Utils from './utils';

class DtoHelper {
	public static getImageDto(key?: string): ImageDto {
		const hasImage = key != undefined;
		const url = Utils.getApiBaseUrl() + `images/${key || 'default'}`;
		return { hasImage, url };
	}
}

export default DtoHelper;
