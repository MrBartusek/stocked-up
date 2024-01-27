import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { SecurityService } from './security.service';

@Module({
	providers: [SecurityService],
	imports: [forwardRef(() => OrganizationsModule)],
	exports: [SecurityService],
})
export class SecurityModule {}
