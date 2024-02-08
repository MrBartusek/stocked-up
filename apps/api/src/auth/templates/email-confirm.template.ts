import { EmailTemplate } from '../../emails/types/email-template.type';
import Utils from '../../helpers/utils';

const BASE_URL = Utils.isProduction() ? 'https://stockedup.dokurno.dev/' : 'http://localhost:5173/';

export class EmailConfirmTemplate implements EmailTemplate {
	constructor(
		private readonly username: string,
		private readonly token: string,
	) {}

	toString(): string {
		return (
			`Welcome to StockedUp ${this.username}! ` +
			`\r\n` +
			`Thanks for singing up! ` +
			`To confirm this e-mail address, please follow this link:` +
			`\r\n\r\n` +
			`${BASE_URL}confirm-email/${this.token}`
		);
	}
}
