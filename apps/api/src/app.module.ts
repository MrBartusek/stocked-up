import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DemoModule } from './demo/demo.module';
import { GravatarModule } from './gravatar/gravatar.module';
import { ImagesModule } from './images/images.module';
import { InventoryModule } from './models/inventory/inventory.module';
import { OrganizationsModule } from './models/organizations/organizations.module';
import { ProductsModule } from './models/products/products.module';
import { UsersModule } from './models/users/users.module';
import { WarehousesModule } from './models/warehouses/warehouses.module';
import { OrganizationResolverModule } from './organization-resolver/organization-resolver.module';
import { RedisModule } from './redis/redis.module';
import { S3CacheModule } from './s3-cache/s3-cache.module';
import { S3Module } from './s3/s3.module';
import { SecurityModule } from './security/security.module';

const FrontendModule = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '../../..', 'client', 'dist'),
});

@Module({
	imports: [
		FrontendModule,
		ProductsModule,
		WarehousesModule,
		MongooseModule.forRoot(process.env.MONGO_URL),
		UsersModule,
		AuthModule,
		OrganizationsModule,
		InventoryModule,
		S3Module,
		ImagesModule,
		RedisModule,
		S3CacheModule,
		GravatarModule,
		DemoModule,
		SecurityModule,
		OrganizationResolverModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
