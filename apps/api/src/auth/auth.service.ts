import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { EmailsService } from '../emails/emails.service';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';
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

	async confirmUserEmail(userId: Types.ObjectId, token: string): Promise<any> {
		const user = await this.usersService.findById(userId);

		if (!userId) {
			throw new BadRequestException('This user does not exist');
		}
		if (user.profile.emailConfirmationToken != token) {
			throw new BadRequestException('This token not valid');
		}
		if (user.profile.isConfirmed) {
			throw new BadRequestException('This token is already used');
		}

		return this.usersService.setConfirmed(user._id, true);
	}

	async sendEmailConfirmation(user: UserDocument) {
		const token = await this.usersService.generateEmailConfirmationToken(user._id);
		const content = new EmailConfirmTemplate(user._id, user.profile.username, token);

		return this.emailService.sendEmail({
			to: user.profile.email,
			subject: '[StockedUp] Confirm E-mail address',
			text: content.toString(),
		});
	}
}
