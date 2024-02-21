import { Module, forwardRef } from '@nestjs/common';
import { GravatarModule } from '../../gravatar/gravatar.module';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { ImagesModule } from '../../images/images.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersTokenService } from './users-token.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(User, UserSchema),
		ImagesModule,
		GravatarModule,
		forwardRef(() => OrganizationsModule),
	],
	controllers: [UsersController],
	providers: [UsersService, UserRepository, UsersTokenService],
	exports: [UsersService, UsersTokenService],
})
export class UsersModule {}
