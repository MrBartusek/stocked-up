import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	setupSwagger(app);

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
