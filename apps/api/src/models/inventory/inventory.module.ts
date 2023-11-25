import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: InventoryItem.name, schema: InventoryItemSchema }]),
		ProductsModule,
		WarehousesModule,
		OrganizationsModule,
	],
	controllers: [InventoryController],
	providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
