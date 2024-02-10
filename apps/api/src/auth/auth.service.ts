import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { EmailsService } from '../emails/emails.service';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { EmailConfirmTemplate } from './templates/email-confirm.template';
import { UsersTokenService } from '../models/users/users-token.service';
import { EMAIL_CONFIRM_TOKEN } from './types/emailTokenTypes';
import { log } from 'console';
import { differenceInDays, differenceInMinutes } from 'date-fns';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private usersTokenService: UsersTokenService,
		private emailService: EmailsService,
	) {}

	private readonly logger = new Logger(AuthService.name);

	async registerUser(data: UserRegisterDto): Promise<UserDocument> {
		const hash = await bcrypt.hash(data.password, 12);

		const user = await this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});

		await this.sendEmailConfirmation(user).catch((error) => {
			this.logger.error(`Failed to send initial confirmation E-mail ${error}`);
		});

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
		const tokenValid = await this.usersTokenService.validateToken({
			userId,
			token,
			type: EMAIL_CONFIRM_TOKEN,
		});

		if (!tokenValid) {
			throw new BadRequestException('This email confirmation link is invalid or expired');
		}

		await this.usersTokenService.invalidateToken(userId, token);
		return this.usersService.setConfirmed(userId, true);
	}

	async retryConfirmationEmail(userId: Types.ObjectId) {
		const user = await this.usersService.findById(userId);
		if (!user) throw new NotFoundException('User not found');

		if (user.profile.isConfirmed) {
			throw new BadRequestException('This user E-mail address is already confirmed');
		}

		const lastRetry = await this.usersTokenService.getLastRetry(userId, EMAIL_CONFIRM_TOKEN);
		if (lastRetry) {
			const minutesDiff = differenceInMinutes(new Date(), lastRetry);
			if (minutesDiff < 5) {
				throw new BadRequestException('Please wait before sending next confirmation email');
			}
		}

		return this.sendEmailConfirmation(user);
	}

	async sendEmailConfirmation(user: UserDocument) {
		const token = await this.usersTokenService.generateAndSaveToken({
			userId: user._id,
			type: EMAIL_CONFIRM_TOKEN,
		});
		const content = new EmailConfirmTemplate(user._id, user.profile.username, token);

		return this.emailService.sendEmail({
			to: user.profile.email,
			subject: '[StockedUp] Confirm E-mail address',
			text: content.toString(),
		});
	}
}
