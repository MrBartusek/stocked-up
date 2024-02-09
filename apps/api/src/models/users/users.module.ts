import { Module } from '@nestjs/common';
import { GravatarModule } from '../../gravatar/gravatar.module';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { ImagesModule } from '../../images/images.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersTokenService } from './users-token.service';

@Module({
	imports: [MongooseModuleHelper.forFeature(User, UserSchema), ImagesModule, GravatarModule],
	controllers: [UsersController],
	providers: [UsersService, UserRepository, UsersTokenService],
	exports: [UsersService, UsersTokenService],
})
export class UsersModule {}
