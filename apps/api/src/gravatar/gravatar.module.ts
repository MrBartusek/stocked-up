import { Module } from '@nestjs/common';
import { GravatarService } from './gravatar.service';

@Module({
	providers: [GravatarService],
	exports: [GravatarService],
})
export class GravatarModule {}
