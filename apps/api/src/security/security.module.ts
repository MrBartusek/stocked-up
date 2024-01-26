import { Module, forwardRef } from '@nestjs/common';
import { SecurityService } from './security.service';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { ResourceAccessService } from './resouce-access.service';

@Module({
	providers: [SecurityService, ResourceAccessService, ResourceAccessService],
	imports: [forwardRef(() => OrganizationsModule)],
	exports: [SecurityService, ResourceAccessService],
})
export class SecurityModule {}
