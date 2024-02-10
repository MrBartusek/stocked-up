import { Types } from 'mongoose';
import { EmailTemplate } from '../../emails/types/email-template.type';
import Utils from '../../helpers/utils';

const BASE_URL = Utils.isProduction() ? 'https://stockedup.dokurno.dev/' : 'http://localhost:5173/';

export class PasswordRestTemplate implements EmailTemplate {
	constructor(
		private readonly userId: Types.ObjectId,
		private readonly token: string,
	) {}

	toString(): string {
		const url = `${BASE_URL}password-reset?user=${this.userId.toString()}&token=${this.token}`;
		return (
			`Hello,` +
			`\r\n` +
			`We've received a request to reset the password for StockedUp account associated ` +
			`with this e-mail address. No changes were made to your account yet.` +
			`\r\n\r\n` +
			`You can reset your password by clicking this link:` +
			`\r\n` +
			url +
			`\r\n\r\n` +
			`If you didn't request a password reset, you can safely ignore this e-mail. ` +
			`No changes to your account will be made.`
		);
	}
}
