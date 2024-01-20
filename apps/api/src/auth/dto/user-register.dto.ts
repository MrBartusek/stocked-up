import { IsEmail, Length, Validate } from 'class-validator';
import { IUserRegisterDto } from 'shared-types';
import { EmailNotTakenRule } from '../../rules/email-not-taken.rule';
import { UsernameNotTakenRule } from '../../rules/username-not-taken.rule copy';

export class UserRegisterDto implements IUserRegisterDto {
	@Length(4, 16)
	@Validate(UsernameNotTakenRule)
	public username: string;

	@IsEmail()
	@Validate(EmailNotTakenRule)
	public email: string;

	@Length(4, 32)
	public password: string;
}
