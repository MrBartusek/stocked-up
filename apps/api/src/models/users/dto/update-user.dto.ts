import { Type } from 'class-transformer';
import { IsEmail, Length, ValidateNested } from 'class-validator';
import { ImageDto } from 'shared-types';
import { IUpdateUserDto } from 'shared-types';

export class UpdateUserDto implements IUpdateUserDto {
	@Length(4, 16)
	username: string;

	@IsEmail()
	email: string;

	@ValidateNested()
	@Type(() => ImageDto)
	image: ImageDto;
}
