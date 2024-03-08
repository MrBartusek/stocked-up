import { NestExpressApplication } from '@nestjs/platform-express';
import { configureNestApp } from '../src/main';

export function configureNestTestApp(app: NestExpressApplication) {
	configureNestApp(app);
}
