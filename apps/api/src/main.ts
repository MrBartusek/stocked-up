import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import redisClient from './redis';
import Utils from './helpers/utils';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

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
