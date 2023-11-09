import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from 'shared-types';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(): any {
		return { message: 'Logged in!', statusCode: 200 };
	}

	@Post('register')
	async register(@Body() body: UserRegisterDto): Promise<any> {
		const user = await this.authService.registerUser(body);
		return { message: `Created user with id: ${user._id}`, statusCode: 200 };
	}
}
