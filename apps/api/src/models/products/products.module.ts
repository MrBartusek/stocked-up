import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsRepository } from './products.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
