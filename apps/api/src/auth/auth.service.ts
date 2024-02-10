import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { differenceInMinutes } from 'date-fns';
import { Types } from 'mongoose';
import { EmailsService } from '../emails/emails.service';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersTokenService } from '../models/users/users-token.service';
import { UsersService } from '../models/users/users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { EmailConfirmTemplate } from './templates/email-confirm.template';
import { PasswordRestTemplate } from './templates/password-reset.template';
import { EMAIL_CONFIRM_TOKEN, PASSWORD_RESET_TOKEN } from './types/emailTokenTypes';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private usersTokenService: UsersTokenService,
		private emailService: EmailsService,
	) {}

	private readonly logger = new Logger(AuthService.name);

	async registerUser(data: UserRegisterDto): Promise<UserDocument> {
		const hash = await this.hashPassword(data.password);

		const user = await this.usersService.create({
			username: data.username,
			email: data.email,
			passwordHash: hash,
		});

		await this.sendEmailConfirmation(user._id).catch((error) => {
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

	async confirmUserEmail(userId: Types.ObjectId, token: string): Promise<UserDocument> {
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

	async resetUserPassword(
		userId: Types.ObjectId,
		token: string,
		password: string,
	): Promise<UserDocument> {
		const tokenValid = await this.usersTokenService.validateToken({
			userId,
			token,
			type: PASSWORD_RESET_TOKEN,
		});

		if (!tokenValid) {
			throw new BadRequestException('This password reset token is invalid or expired');
		}

		await this.usersTokenService.invalidateToken(userId, token);

		// Confirm email on password reset
		await this.usersService.setConfirmed(userId, true);

		const hash = await this.hashPassword(password);
		return this.usersService.findOneByIdAndUpdate(userId, { 'auth.password': hash });
	}

	async sendEmailConfirmation(userId: Types.ObjectId) {
		const user = await this.usersService.findById(userId);
		if (!user) throw new NotFoundException('User not found');

		if (user.profile.isConfirmed) {
			throw new BadRequestException('This user E-mail address is already confirmed');
		}

		await this.validateIfCanSendEmail(userId, EMAIL_CONFIRM_TOKEN);

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

	async sendPasswordResetEmail(email: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) throw new NotFoundException('This E-mail is not associated with any user account!');

		await this.validateIfCanSendEmail(user._id, PASSWORD_RESET_TOKEN);

		const token = await this.usersTokenService.generateAndSaveToken({
			userId: user._id,
			type: PASSWORD_RESET_TOKEN,
		});
		const content = new PasswordRestTemplate(user._id, token);

		return this.emailService.sendEmail({
			to: user.profile.email,
			subject: '[StockedUp] Password reset request',
			text: content.toString(),
		});
	}

	private async validateIfCanSendEmail(userId: Types.ObjectId, token: string): Promise<boolean> {
		const lastRetry = await this.usersTokenService.getLastRetry(userId, token);
		if (lastRetry) {
			const minutesDiff = differenceInMinutes(new Date(), lastRetry);
			if (minutesDiff < 10) {
				throw new BadRequestException(
					'The confirmation email was sent recently, please check your inbox',
				);
			}
		}
		return true;
	}

	private hashPassword(input: string): Promise<string> {
		return bcrypt.hash(input, 12);
	}
}
