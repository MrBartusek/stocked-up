import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PrivateUserDto, UserDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Put()
	async updateProfile(@Req() request: Request, @Body() dto: UpdateUserDto) {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.usersService.updateProfile(userId, dto);
		return User.toPrivateDto(user);
	}

	@Get('me')
	async findAuthenticated(@Req() request: Request): Promise<PrivateUserDto> {
		const user = await this.usersService.findById(request.user.id);

		if (!user) {
			throw new NotFoundException();
		}

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
