import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import { json } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { join } from 'path';
import { AppModule } from './app.module';
import Utils from './helpers/utils';
import redisClient from './redis/connect';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Allow for base64 attachments
	app.use(json({ limit: '50mb' }));

	// Serve frontend
	app.useStaticAssets(join(__dirname, '../..', 'public'), { prefix: '/public/' });

	// Frontend is served on / by static serve module, so serve api on /api
	app.setGlobalPrefix('api');

	// This is for decency injection in custom validators
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	// Setup validation with class-validator and class-transformer
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
