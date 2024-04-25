import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { AuthEmailsService } from './auth-emails.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth-emails')
@ApiTags('auth-emails')
export class AuthEmailsController {
	constructor(private readonly authEmailsService: AuthEmailsService) {}

	@Post('confirm-email/start')
	@UseGuards(AuthGuard)
	async startEmailConfirmation(@Req() request: Request): Promise<any> {
		const userId = new Types.ObjectId(request.user.id);
		await this.authEmailsService.sendEmailConfirmation(userId);
		return { statusCode: 200 };
	}

	@Post('confirm-email/confirm')
	async confirmEmail(
		@Query('user', ParseObjectIdPipe) userId: Types.ObjectId,
		@Query('token') token: string,
	): Promise<any> {
		await this.authEmailsService.confirmEmailWithToken(userId, token);
		return { statusCode: 200 };
	}

	@Post('reset-password/start')
	async startPasswordReset(@Query('email') email: string): Promise<any> {
		await this.authEmailsService.sendPasswordResetEmail(email);
		return { statusCode: 200 };
	}

	@Post('reset-password/reset')
	async resetPassword(@Body() dto: ResetPasswordDto): Promise<any> {
		const userId = new Types.ObjectId(dto.user);
		await this.authEmailsService.resetPasswordWithToken(userId, dto.token, dto.password);
		return { statusCode: 200 };
	}
}
