import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { IUpdateEmailDto } from 'shared-types';
import { EmailNotTakenRule } from '../../rules/email-not-taken.rule';

export class UpdateEmailDto implements IUpdateEmailDto {
	@IsString()
	@Length(4, 32)
	password: string;

	@IsEmail()
	@Validate(EmailNotTakenRule)
	email: string;
}
