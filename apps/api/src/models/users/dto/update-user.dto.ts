import { Type } from 'class-transformer';
import { IsEmail, Length, ValidateNested } from 'class-validator';
import { IUpdateUserDto } from 'shared-types';
import { ImageDto } from './image.dto';

export class UpdateUserDto implements IUpdateUserDto {
	@Length(4, 16)
	username: string;

	@IsEmail()
	email: string;

	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;
}
