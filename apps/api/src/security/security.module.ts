import { Module, forwardRef } from '@nestjs/common';
import { SecurityService } from './security.service';
import { OrganizationsModule } from '../models/organizations/organizations.module';

@Module({
	providers: [SecurityService],
	imports: [forwardRef(() => OrganizationsModule)],
	exports: [SecurityService],
})
export class SecurityModule {}
