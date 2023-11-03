import { Controller, Get, NotFoundException, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Request } from 'express';
import { UserDto } from 'shared-types';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthenticatedGuard)
	@Get('me')
	async findAuthenticated(@Req() request: Request): Promise<UserDto> {
		const user = await this.usersService.findById(request.user.id);

		return {
			id: user._id,
			username: user.profile.username,
		};
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<UserDto> {
		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return {
			id: user._id,
			username: user.profile.username,
		};
	}
}
