import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PrivateUserDto } from 'shared-types';
import { DemoService } from '../demo/demo.service';
import { User } from '../models/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly demoService: DemoService,
	) {}

	@UseGuards(LocalAuthGuard)
	@HttpCode(200)
	@Post('login')
	login(): any {
		return { message: 'Logged in!', statusCode: 200 };
	}

	@UseGuards(AuthenticatedGuard)
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
	async register(@Body() body: UserRegisterDto): Promise<any> {
		const user = await this.authService.registerUser(body);
		return { message: `Created user with id: ${user._id}`, statusCode: 200 };
	}

	@HttpCode(200)
	@Post('demo')
	async createDemo(): Promise<PrivateUserDto> {
		const user = await this.demoService.setupDemoAccount();
		const dto = User.toPrivateDto(user);
		return dto;
	}
}
