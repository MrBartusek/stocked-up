import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Resend } from 'resend';

const DEFAULT_EMAIL_SENDER = 'noreply@dokurno.dev';

const { EMAIL_SENDER } = process.env;

const EMAIL_FOOTER = `

Thanks,
StockedUp Team
---
This is automated message sent by StockedUp. Please do not reply to this email.
If you received this email by mistake or believe it is a spam, please forward it to bartosz@dokurno.dev`;

export interface SendEmailOptions {
	to: string;
	subject: string;
	text: string;
}

@Injectable()
export class EmailsService {
	constructor(@Inject('RESEND') private readonly resend: Resend) {}

	private readonly logger = new Logger(EmailsService.name);

	async sendEmail(options: SendEmailOptions): Promise<string> {
		const result = await this.resend.emails.send({
			...options,
			from: `StockedUp <${EMAIL_SENDER || DEFAULT_EMAIL_SENDER}>`,
			text: options.text + EMAIL_FOOTER,
		});

		if (result.error) {
			this.logger.error(`Failed to send email! [${result.error.name}] ${result.error.message}`);
			throw new InternalServerErrorException('Failed to send email to this address');
		}

		this.logger.log(`Sent email "${options.subject}" to ${options.to} (${result.data.id})`);
		return result.data.id;
	}
}
