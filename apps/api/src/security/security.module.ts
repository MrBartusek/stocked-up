import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';

@Module({
	providers: [SecurityService],
	imports: [forwardRef(() => OrganizationsModule)],
	exports: [SecurityService],
	controllers: [SecurityController],
})
export class SecurityModule {}
