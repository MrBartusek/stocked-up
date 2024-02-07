import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { OrganizationResolverModule } from '../organization-resolver/organization-resolver.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { UsersModule } from '../models/users/users.module';

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
