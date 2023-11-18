import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './models/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './models/organizations/organizations.module';
import { WarehousesModule } from './models/warehouses/warehouses.module';
import { InventoryModule } from './models/inventory/inventory.module';

const FrontendModule = ServeStaticModule.forRoot({
	rootPath: join(__dirname, '../..', 'client', 'dist'),
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
