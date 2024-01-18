import { IsEmail, Length } from 'class-validator';
import { IUserRegisterDto } from 'shared-types';

export class UserRegisterDto implements IUserRegisterDto {
	@Length(4, 16)
	public username: string;

	@IsEmail()
	public email: string;

	@Length(4, 32)
	public password: string;
}
