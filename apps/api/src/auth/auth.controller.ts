import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	HttpCode,
	Logger,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PrivateUserDto } from 'shared-types';
import { AuthEmailsService } from '../auth-emails/auth-emails.service';
import { NotDemoGuard } from '../models/users/guards/not-demo.guard';
import { User } from '../models/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { NotOrgOwnerGuard } from '../models/users/guards/org-owner.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly authEmailsService: AuthEmailsService,
	) {}

	private readonly logger = new Logger(AuthController.name);

	@UseGuards(LocalAuthGuard)
	@HttpCode(200)
	@Post('login')
	login(): any {
		return { message: 'Logged in!', statusCode: 200 };
	}

	@UseGuards(AuthGuard)
	@HttpCode(200)
	@Post('logout')
	logout(@Req() request: Request): Promise<any> {
		return new Promise((resolve) => {
			request.logout((error) => {
				if (error) {
					throw new BadRequestException(error);
				}
				resolve({ message: 'Logged out!', statusCode: 200 });
			});
		});
	}

	@HttpCode(200)
	@Post('register')
	async register(@Body() body: UserRegisterDto): Promise<PrivateUserDto> {
		const user = await this.authService.registerUser(body);

		await this.authEmailsService.sendEmailConfirmation(user._id).catch((error) => {
			this.logger.error(`Failed to send initial confirmation email for ${user._id} - ${error}`);
		});

		return User.toPrivateDto(user);
	}

	@Post('change-password')
	@UseGuards(NotDemoGuard)
	@UseGuards(AuthGuard)
	async changePassword(
		@Req() request: Request,
		@Body() body: ChangePasswordDto,
	): Promise<PrivateUserDto> {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.authService.validateUserByUserId(userId, body.oldPassword);

		if (!user) {
			throw new BadRequestException('Provided old password is not valid.');
		}

		await this.authService.updateUserPassword(user._id, body.newPassword);
		return User.toPrivateDto(user);
	}

	@Post('change-email')
	@UseGuards(NotDemoGuard)
	@UseGuards(AuthGuard)
	async changeEmail(@Req() request: Request, @Body() dto: UpdateEmailDto) {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.authService.validateUserByUserId(userId, dto.password);

		if (!user) {
			throw new BadRequestException('Provided password is not valid.');
		}

		const newUser = await this.authService.updateUserEmail(user._id, dto.email);
		await this.authEmailsService.sendEmailConfirmation(user._id);

		return User.toPrivateDto(newUser);
	}

	@Delete('delete')
	@UseGuards(AuthGuard)
	@UseGuards(NotDemoGuard)
	@UseGuards(NotOrgOwnerGuard)
	async deleteAccount(@Req() request: Request, @Body() dto: DeleteAccountDto) {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.authService.validateUserByUserId(userId, dto.password);

		if (!user) {
			throw new BadRequestException('Provided password is not valid.');
		}

		await this.authService.deleteUserAccount(user._id);

		return { statusCode: 200 };
	}
}
