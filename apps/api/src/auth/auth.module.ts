import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DemoModule } from '../demo/demo.module';
import { EmailsModule } from '../emails/emails.module';
import { UsersModule } from '../models/users/users.module';
import { EmailNotTakenRule } from '../rules/email-not-taken.rule';
import { UsernameNotTakenRule } from '../rules/username-not-taken.rule copy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [UsersModule, DemoModule, PassportModule.register({ session: true }), EmailsModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		SessionSerializer,
		UsernameNotTakenRule,
		EmailNotTakenRule,
	],
})
export class AuthModule {}
