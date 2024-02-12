import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ResendFactory } from './resend.factory';

const { RESEND_API_KEY } = process.env;

@Module({
	providers: [
		EmailsService,
		{
			provide: 'RESEND',
			useValue: new ResendFactory().getInstance(RESEND_API_KEY),
		},
	],
	exports: [EmailsService],
})
export class EmailsModule {}
