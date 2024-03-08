import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { PrivateUserDto, UserDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	@ApiOperation({ summary: 'Get authenticated user data' })
	async findAuthenticated(@Req() request: Request): Promise<PrivateUserDto> {
		const userId = new Types.ObjectId(request.user.id);
		const user = await this.usersService.findById(userId);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toPrivateDto(user);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user data by id' })
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<UserDto> {
		const user = await this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return User.toDto(user);
	}

	@Put()
	@ApiOperation({ summary: 'Update authenticated user profile' })
	async updateProfile(@Req() request: Request, @Body() dto: UpdateUserDto) {
		const userId = new Types.ObjectId(request.user.id);

		const user = await this.usersService.findById(userId);
		if (!user) {
			throw new NotFoundException();
		}

		if (dto.username != user.profile.username) {
			if (user.profile.isDemo) {
				throw new ForbiddenException('This action is not available for demo accounts');
			}

			const usernameTaken = await this.usersService.isUsernameTaken(dto.username);
			if (usernameTaken) {
				throw new BadRequestException('This username is already taken');
			}
		}

		const updatedUser = await this.usersService.updateProfile(userId, dto);
		return User.toPrivateDto(updatedUser);
	}
}
