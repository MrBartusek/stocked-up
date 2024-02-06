import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsModule } from '../models/organizations/organizations.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
	providers: [SecurityService],
	imports: [forwardRef(() => OrganizationsModule)],
	exports: [SecurityService],
	controllers: [SecurityController],
})
export class SecurityModule {}
