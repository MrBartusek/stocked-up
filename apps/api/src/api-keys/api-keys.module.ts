import { Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { UsersModule } from '../models/users/users.module';

@Module({
	controllers: [ApiKeysController],
	providers: [ApiKeysService],
	imports: [UsersModule],
})
export class ApiKeysModule {}
