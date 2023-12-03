import { Controller, Get, NotFoundException, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PrivateUserDto, UserDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

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
