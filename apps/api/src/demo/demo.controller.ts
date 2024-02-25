import { Controller, Post } from '@nestjs/common';
import { DemoService } from './demo.service';
import { User } from '../models/users/schemas/user.schema';
import { PrivateUserDto } from 'shared-types';
import { ApiTags } from '@nestjs/swagger';

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
