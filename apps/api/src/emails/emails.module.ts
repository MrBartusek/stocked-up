import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { Resend } from 'resend';

const { RESEND_API_KEY } = process.env;

@Module({
	providers: [EmailsService, { provide: 'RESEND', useFactory: () => new Resend(RESEND_API_KEY) }],
	exports: [EmailsService],
})
export class EmailsModule {}
