import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
	imports: [
		OrganizationsModule,
		MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
	],
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository],
	exports: [ProductsService],
})
export class ProductsModule {}
