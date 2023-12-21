import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import Utils from './helpers/utils';
import redisClient from './redis/connect';
import { json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(json({ limit: '50mb' }));
	app.useStaticAssets(join(__dirname, '../..', 'public'), { prefix: '/public/' });
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	setupSwagger(app);

	const redisStore = new RedisStore({
		client: redisClient,
		prefix: 'session:',
	});

	app.use(
		session({
			store: redisStore,
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: 'strict',
				secure: Utils.isProduction(),
			},
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(3000);
}

async function setupSwagger(app: INestApplication<any>) {
	const config = new DocumentBuilder()
		.setTitle('StockedUp API')
		.setDescription('StockedUp API documentation')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
}

bootstrap();
