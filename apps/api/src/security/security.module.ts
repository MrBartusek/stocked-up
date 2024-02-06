import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { OrganizationResolverModule } from '../organization-resolver/organization-resolver.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
	providers: [SecurityService],
	imports: [forwardRef(() => OrganizationsModule), forwardRef(() => OrganizationResolverModule)],
	exports: [SecurityService],
	controllers: [SecurityController],
})
export class SecurityModule {}
