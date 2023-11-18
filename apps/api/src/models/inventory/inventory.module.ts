import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryItem, InventoryItemSchema } from './schemas/inventory-item.schema';
import { InventoryRepository } from './inventory.repository';

@Module({
	imports: [MongooseModule.forFeature([{ name: InventoryItem.name, schema: InventoryItemSchema }])],
	controllers: [InventoryController],
	providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
