import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { EmailsService } from '../emails/emails.service';
import { Types } from 'mongoose';
import { EmailConfirmTemplate } from './templates/email-confirm.template';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private emailService: EmailsService,
	) {}

	async registerUser(data: UserRegisterDto): Promise<UserDocument> {
		const hash = await bcrypt.hash(data.password, 12);

		const user = await this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});

		await this.sendEmailConfirmation(user);
		return user;
	}

	async validateUser(username: string, password: string): Promise<UserDocument> {
		const user = await this.usersService.findOne(username);

		if (user && user.profile.isDemo && user.auth.password == null) {
			return user;
		}

		const RANDOM_STRING = 'e8a4462c2fea6008ff67b00f890';

		const passwordValid = await bcrypt.compare(password, user?.auth.password || RANDOM_STRING);

		if (user && passwordValid) {
			return user;
		}
	}

	async confirmUserEmail(token: string): Promise<any> {
		const user = await this.usersService.findByEmailToken(token);

		if (!user) {
			throw new BadRequestException('Provided token is invalid');
		}
		if (user.profile.isActive) {
			throw new BadRequestException('This token is already used');
		}

		return this.usersService.setActive(user._id, true);
	}

	async sendEmailConfirmation(user: UserDocument) {
		const token = await this.usersService.generateEmailConfirmationToken(user._id);
		const content = new EmailConfirmTemplate(user.profile.username, token);

		return this.emailService.sendEmail({
			to: user.profile.email,
			subject: '[StockedUp] Confirm E-mail address',
			text: content.toString(),
		});
	}
}
