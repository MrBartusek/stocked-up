import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthEmailsModule } from '../auth-emails/auth-emails.module';
import { UsersModule } from '../models/users/users.module';
import { EmailNotTakenRule } from '../rules/email-not-taken.rule';
import { UsernameNotTakenRule } from '../rules/username-not-taken.rule copy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		PassportModule.register({ session: true }),

		UsersModule,
		forwardRef(() => AuthEmailsModule),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		SessionSerializer,
		UsernameNotTakenRule,
		EmailNotTakenRule,
	],
	exports: [AuthService],
})
export class AuthModule {}
