import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { IUpdateUserDto } from 'shared-types';
import { ImageDto } from './image.dto';

export class UpdateUserDto implements IUpdateUserDto {
	@IsString()
	@Length(4, 16)
	username: string;

	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;
}
