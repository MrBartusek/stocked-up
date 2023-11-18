import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { BasicInventoryItemDto, InventoryItemDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './schemas/inventory-item.schema';

@ApiTags('inventory')
@UseGuards(AuthenticatedGuard)
@Controller('inventory')
export class InventoryController {
	constructor(private readonly inventoryService: InventoryService) {}

	@Get(':id')
	async findOne(@Param(':id', ParseObjectIdPipe) id: Types.ObjectId): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findOne(id);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}

	@Get('by-warehouse/:id')
	async findAll(
		@Param('id', ParseObjectIdPipe) warehouseId: Types.ObjectId,
	): Promise<BasicInventoryItemDto[]> {
		const items = await this.inventoryService.findAll(warehouseId);

		return items.map((i) => InventoryItem.toBasicDto(i));
	}
}
