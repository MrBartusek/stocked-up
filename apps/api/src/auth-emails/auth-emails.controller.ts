import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthEmailsService } from './auth-emails.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../pipes/prase-object-id.pipe';
import { Types } from 'mongoose';
import { Request } from 'express';
import { PrivateUserDto } from 'shared-types';
import { User } from '../models/users/schemas/user.schema';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth-emails')
export class AuthEmailsController {
	constructor(private readonly authEmailsService: AuthEmailsService) {}

	@Post('confirm-email/start')
	@UseGuards(AuthenticatedGuard)
	async startEmailConfirmation(@Req() request: Request): Promise<any> {
		const userId = new Types.ObjectId(request.user.id);
		await this.authEmailsService.sendEmailConfirmation(userId);
		return { statusCode: 200 };
	}

	@Post('confirm-email/confirm')
	async confirmEmail(
		@Query('user', ParseObjectIdPipe) userId: Types.ObjectId,
		@Query('token') token: string,
	): Promise<PrivateUserDto> {
		const user = await this.authEmailsService.confirmEmailWithToken(userId, token);
		return User.toPrivateDto(user);
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
