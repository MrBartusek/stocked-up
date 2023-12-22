import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { InventoryModule } from './models/inventory/inventory.module';
import { OrganizationsModule } from './models/organizations/organizations.module';
import { ProductsModule } from './models/products/products.module';
import { UsersModule } from './models/users/users.module';
import { WarehousesModule } from './models/warehouses/warehouses.module';
import { RedisModule } from './redis/redis.module';
import { S3CacheModule } from './s3-cache/s3-cache.module';
import { S3Module } from './s3/s3.module';

const FrontendModule = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '../../..', 'client', 'dist'),
});

@Module({
	imports: [
		FrontendModule,
		ProductsModule,
		WarehousesModule,
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/stockedUp'),
		UsersModule,
		AuthModule,
		OrganizationsModule,
		InventoryModule,
		S3Module,
		ImagesModule,
		RedisModule,
		S3CacheModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
