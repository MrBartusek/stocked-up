import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../models/users/users.service';

@ValidatorConstraint({ name: 'EmailNotTakenRule', async: true })
@Injectable()
export class EmailNotTakenRule implements ValidatorConstraintInterface {
	constructor(private readonly usersService: UsersService) {}

	async validate(value: string) {
		const taken = await this.usersService.isEmailTaken(value);
		return !taken;
	}

	defaultMessage() {
		return (
			`This E-Mail is already taken. ` +
			`To recover your account please user "Forgot Password" button.`
		);
	}
}
