import { Module } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { ImagesModule } from '../../images/images.module';
import { GravatarModule } from '../../gravatar/gravatar.module';

@Module({
	imports: [MongooseModuleHelper.forFeature(User, UserSchema), ImagesModule, GravatarModule],
	controllers: [UsersController],
	providers: [UsersService, UserRepository],
	exports: [UsersService],
})
export class UsersModule {}
