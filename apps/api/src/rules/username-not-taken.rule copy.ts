import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UsersService } from '../models/users/users.service';

@ValidatorConstraint({ name: 'EmailNotTakenRule', async: true })
@Injectable()
export class UsernameNotTakenRule implements ValidatorConstraintInterface {
	constructor(private readonly usersService: UsersService) {}

	async validate(value: string) {
		const taken = await this.usersService.isUsernameTaken(value);
		return !taken;
	}

	defaultMessage() {
		return `This username is already taken.`;
	}
}
