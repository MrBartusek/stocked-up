import { Module, forwardRef } from '@nestjs/common';
import MongooseModuleHelper from '../../helpers/mongoose-module.helper';
import { ImagesModule } from '../../images/images.module';
import { OrganizationResolverModule } from '../../organization-resolver/organization-resolver.module';
import { SecurityModule } from '../../security/security.module';
import { OrganizationDeletedListener } from './listeners/organization-deleted.listener';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
	imports: [
		MongooseModuleHelper.forFeature(Product, ProductSchema),
		forwardRef(() => OrganizationResolverModule),
		forwardRef(() => SecurityModule),
		ImagesModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService, ProductsRepository, OrganizationDeletedListener],
	exports: [ProductsService],
})
export class ProductsModule {}
