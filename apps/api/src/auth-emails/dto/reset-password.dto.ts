import { IsMongoId, IsString, Length } from 'class-validator';
import { IResetPasswordDto } from 'shared-types';

export class ResetPasswordDto implements IResetPasswordDto {
	@IsMongoId()
	user: string;

	@IsString()
	token: string;

	@IsString()
	@Length(4, 32)
	password: string;
}
