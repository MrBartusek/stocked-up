import { Module } from '@nestjs/common';
import { GravatarService } from './gravatar.service';

@Module({
	providers: [GravatarService],
})
export class GravatarModule {}
