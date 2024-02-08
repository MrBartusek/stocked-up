import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Resend } from 'resend';

const DEFAULT_EMAIL_SENDER = 'stockedup@dokurno.dev';

const { RESEND_API_KEY, EMAIL_SENDER } = process.env;

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
			from: `StockedUp <${EMAIL_SENDER || DEFAULT_EMAIL_SENDER}>`,
			...options,
		});

		if (result.error) {
			this.logger.error(`Failed to send email! [${result.error.name}] ${result.error.message}`);
			throw new InternalServerErrorException('Failed to send email to this address');
		}

		this.logger.log(`Sent email "${options.subject}" to ${options.to} (${result.data.id})`);
		return result.data.id;
	}
}
