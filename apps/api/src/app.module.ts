import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthEmailsModule } from './auth-emails/auth-emails.module';
import { AuthModule } from './auth/auth.module';
import { DemoModule } from './demo/demo.module';
import { EmailsModule } from './emails/emails.module';
import { GravatarModule } from './gravatar/gravatar.module';
import { ImagesModule } from './images/images.module';
import { InventoryModule } from './models/inventory/inventory.module';
import { OrganizationsModule } from './models/organizations/organizations.module';
import { ProductsModule } from './models/products/products.module';
import { UsersModule } from './models/users/users.module';
import { WarehousesModule } from './models/warehouses/warehouses.module';
import { OrganizationResolverModule } from './organization-resolver/organization-resolver.module';
import client from './redis/connect';
import { RedisModule } from './redis/redis.module';
import { S3CacheModule } from './s3-cache/s3-cache.module';
import { S3Module } from './s3/s3.module';
import { SecurityModule } from './security/security.module';
import { ApiKeysModule } from './api-keys/api-keys.module';

const FrontendModule = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '../..', 'client', 'dist'),
});

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGO_URL),
		EventEmitterModule.forRoot({ wildcard: true }),
		BullModule.forRoot({
			redis: { ...client.options, maxRetriesPerRequest: null, enableReadyCheck: false },
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
				delay: 500,
			},
		}),
		FrontendModule,
		ProductsModule,
		WarehousesModule,
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
		EmailsModule,
		AuthEmailsModule,
		ApiKeysModule,
	],
})
export class AppModule {}
