import { Module } from '@nestjs/common';
import { UsersModule } from '../models/users/users.module';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';

@Module({
	controllers: [ApiKeysController],
	providers: [ApiKeysService],
	imports: [UsersModule],
	exports: [ApiKeysService],
})
export class ApiKeysModule {}
