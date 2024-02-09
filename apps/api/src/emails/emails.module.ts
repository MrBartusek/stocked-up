import { Module } from '@nestjs/common';
import { Resend } from 'resend';
import { EmailsService } from './emails.service';

const { RESEND_API_KEY } = process.env;

@Module({
	providers: [EmailsService, { provide: 'RESEND', useFactory: () => new Resend(RESEND_API_KEY) }],
	exports: [EmailsService],
})
export class EmailsModule {}
