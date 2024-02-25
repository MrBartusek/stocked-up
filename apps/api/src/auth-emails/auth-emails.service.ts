import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { differenceInMinutes } from 'date-fns';
import { Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { EMAIL_CONFIRM_TOKEN, PASSWORD_RESET_TOKEN } from '../auth/types/emailTokenTypes';
import { EmailsService } from '../emails/emails.service';
import { DemoLockedException } from '../exceptions/demo-locked.exception';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersTokenService } from '../models/users/users-token.service';
import { UsersService } from '../models/users/users.service';
import { EmailConfirmTemplate } from './templates/email-confirm.template';
import { PasswordRestTemplate } from './templates/password-reset.template';

@Injectable()
export class AuthEmailsService {
	constructor(
		private usersService: UsersService,
		private usersTokenService: UsersTokenService,
		private emailService: EmailsService,
		private authService: AuthService,
	) {}

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

		return await this.emailService.sendEmail({
			to: user.profile.email,
			subject: '[StockedUp] Confirm E-mail address',
			text: content.toString(),
		});
	}

	async sendPasswordResetEmail(email: string) {
		const user = await this.usersService.findByEmail(email);

		if (!user) throw new NotFoundException('This E-mail is not associated with any user account!');
		if (user.profile.isDemo) throw new DemoLockedException();
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

	async confirmEmailWithToken(userId: Types.ObjectId, token: string): Promise<UserDocument> {
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

	async resetPasswordWithToken(
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
		await this.usersService.setConfirmed(userId, true);
		return this.authService.updateUserPassword(userId, password);
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
}
