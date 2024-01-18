import { IsBoolean, IsDataURI, IsEmpty, IsOptional } from 'class-validator';
import { IImageDto } from 'shared-types';

class ImageDto implements IImageDto {
	@IsBoolean()
	hasImage: boolean;

	@IsEmpty()
	@IsOptional()
	url?: string;

	@IsOptional()
	@IsDataURI()
	data?: string;
}

export default ImageDto;
