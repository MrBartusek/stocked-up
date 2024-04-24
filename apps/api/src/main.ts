import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import RedisStore from 'connect-redis';
import { json } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import Utils from './helpers/utils';
import redisClient from './redis/connect';

const { PORT } = process.env;

async function bootstrapNestApp() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	configureNestApp(app);
	setupSwagger(app);

	await app.listen(PORT || 3000);
}

export function configureNestApp(app: NestExpressApplication): void {
	// Allow for base64 attachments
	app.use(json({ limit: '50mb' }));

	// Frontend is served on / by static serve module, so serve api on /api
	app.setGlobalPrefix('api');

	// This is for decency injection in custom validators
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	// Setup validation with class-validator and class-transformer
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	setupSession(app);
	app.use(passport.initialize());
	app.use(passport.session());
}

async function setupSwagger(app: NestExpressApplication) {
	const config = new DocumentBuilder()
		.setTitle('StockedUp API')
		.setDescription(
			'StockedUp official API documentation! ' +
				'API keys are coming: [#61](https://github.com/MrBartusek/stocked-up/issues/61)',
		)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
}

async function setupSession(app: NestExpressApplication) {
	const redisStore = new RedisStore({
		client: redisClient,
		prefix: 'session:',
	});

	const isProduction = Utils.isProduction();

	if (isProduction) {
		// Allow for setting secure cookies via reverse proxy
		// Recommended deployment way is NGINX reverse proxy
		app.set('trust proxy', 1);
	}

	const sessionSecret = Utils.isTest() ? 'keyboard cat' : process.env.SESSION_SECRET;

	app.use(
		session({
			store: redisStore,
			secret: sessionSecret,
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
}

bootstrapNestApp();
