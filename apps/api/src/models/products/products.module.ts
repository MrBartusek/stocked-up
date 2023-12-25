import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongose-module-helper';
import { ImagesModule } from '../../images/images.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

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
