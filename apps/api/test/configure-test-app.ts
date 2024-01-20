import { INestApplication } from '@nestjs/common';
import { configureNestApp } from '../src/main';

export function configureNestTestApp(app: INestApplication) {
	configureNestApp(app);
}
