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

/**
 * NestSetup class is responsible for configuring nest startup sequence,
 * express middlewares, global pipes and such
 *
 * This class can be used for both regular start and e2e start.
 */
export default class NestSetup {
	static async setupNestApp(port: string) {
		const app = await NestFactory.create<NestExpressApplication>(AppModule);

		this.configureNestApp(app);
		this.setupSwagger(app);

		await app.listen(port || 3000);
	}

	static configureNestApp(app: NestExpressApplication): void {
		// Allow for base64 attachments
		app.use(json({ limit: '50mb' }));

		// Frontend is served on / by static serve module, so serve api on /api
		app.setGlobalPrefix('api');

		// This is for decency injection in custom validators
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useContainer(app.select(AppModule), { fallbackOnErrors: true });

		// Setup validation with class-validator and class-transformer
		app.useGlobalPipes(new ValidationPipe({ transform: true }));

		this.setupSession(app);
		app.use(passport.initialize());
		app.use(passport.session());
	}

	private static async setupSwagger(app: NestExpressApplication) {
		const config = new DocumentBuilder()
			.setTitle('StockedUp API')
			.setDescription(
				'Welcome to StockedUp official API reference!\n\nLinks:\n' +
					'- [API Documentation](https://stockedup.dokurno.dev/dashboard/user/me/developer)\n' +
					'- [Issues tracker](https://github.com/MrBartusek/stocked-up/issues)\n' +
					'- [GitHub](https://github.com/MrBartusek/stocked-up)\n' +
					'- [Postman](https://app.getpostman.com/run-collection/7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7%26entityType%3Dcollection%26workspaceId%3D264913a4-bcdd-4e43-847c-1e8cbca3334b)',
			)
			.setVersion('v1')
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);
	}

	private static async setupSession(app: NestExpressApplication) {
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
}
