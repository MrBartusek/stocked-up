import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './models/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

const FrontendModule = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '../..', 'client', 'dist'),
});

@Module({
	imports: [
		FrontendModule,
		ProductsModule,
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/stockedUp'),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
