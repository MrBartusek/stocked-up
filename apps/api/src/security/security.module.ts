import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { UsersModule } from '../models/users/users.module';
import { OrganizationResolverModule } from '../organization-resolver/organization-resolver.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
	providers: [SecurityService],
	imports: [
		forwardRef(() => OrganizationsModule),
		forwardRef(() => OrganizationResolverModule),
		UsersModule,
	],
	exports: [SecurityService],
	controllers: [SecurityController],
})
export class SecurityModule {}
