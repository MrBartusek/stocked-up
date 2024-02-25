import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivateUserDto } from 'shared-types';
import { User } from '../models/users/schemas/user.schema';
import { DemoService } from './demo.service';

@ApiTags('demo')
@Controller('demo')
export class DemoController {
	constructor(private readonly demoService: DemoService) {}

	@Post('register')
	async createDemo(): Promise<PrivateUserDto> {
		const user = await this.demoService.setupDemoAccount();
		return User.toPrivateDto(user);
	}
}
