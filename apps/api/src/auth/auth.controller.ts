import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from 'shared-types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(): any {
		return { message: 'Logged in!', statusCode: 200 };
	}

	@UseGuards(AuthenticatedGuard)
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

	@Post('register')
	async register(@Body(new ValidationPipe()) body: UserRegisterDto): Promise<any> {
		const user = await this.authService.registerUser(body);
		return { message: `Created user with id: ${user._id}`, statusCode: 200 };
	}
}
