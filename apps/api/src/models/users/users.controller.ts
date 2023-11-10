import { Controller, Get, NotFoundException, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { PrivateUserDto, UserDto } from 'shared-types';
import { ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthenticatedGuard)
	@Get('me')
	async findAuthenticated(@Req() request: Request): Promise<PrivateUserDto> {
		const user = await this.usersService.findById(request.user.id);

		return User.toPrivateDto(user);
	}

	@UseGuards(AuthenticatedGuard)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<UserDto> {
		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toPrivateDto(user);
	}
}
