import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from '../inventory/inventory.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ImagesModule } from '../../images/images.module';
import MongooseModuleHelper from '../../helpers/mongose-module-helper';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Product, ProductSchema),
		OrganizationsModule,
		forwardRef(() => InventoryModule),
		ImagesModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository],
	exports: [ProductsService],
})
export class ProductsModule {}
