import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EmailsModule } from '../emails/emails.module';
import { UsersModule } from '../models/users/users.module';
import { AuthEmailsController } from './auth-emails.controller';
import { AuthEmailsService } from './auth-emails.service';

@Module({
	imports: [EmailsModule, UsersModule, forwardRef(() => AuthModule)],
	providers: [AuthEmailsService],
	controllers: [AuthEmailsController],
	exports: [AuthEmailsService],
})
export class AuthEmailsModule {}
