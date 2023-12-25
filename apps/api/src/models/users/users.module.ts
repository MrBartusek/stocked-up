import { Module } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongose-module-helper';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
	imports: [MongooseModuleHelper.forFeature(User, UserSchema)],
	controllers: [UsersController],
	providers: [UsersService, UserRepository],
	exports: [UsersService],
})
export class UsersModule {}
