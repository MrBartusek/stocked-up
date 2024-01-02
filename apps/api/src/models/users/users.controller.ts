import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Put,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PrivateUserDto, UpdateUserDto, UserDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Put()
	async updateProfile(@Req() request: Request, @Body(ValidationPipe) dto: UpdateUserDto) {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.usersService.updateProfile(userId, dto);
		return User.toPrivateDto(user);
	}

	@Get('me')
	async findAuthenticated(@Req() request: Request): Promise<PrivateUserDto> {
		const user = await this.usersService.findById(request.user.id);
		return User.toPrivateDto(user);
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<UserDto> {
		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toPrivateDto(user);
	}
}
