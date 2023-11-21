import {
	BadRequestException,
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Query,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AddInventoryItemDto, BasicInventoryItemDto, InventoryItemDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './schemas/inventory-item.schema';
import { WarehousesService } from '../warehouses/warehouses.service';
import { ProductsService } from '../products/products.service';

@ApiTags('inventory')
@UseGuards(AuthenticatedGuard)
@Controller('inventory')
export class InventoryController {
	constructor(
		private readonly inventoryService: InventoryService,
		private readonly warehousesService: WarehousesService,
		private readonly productService: ProductsService,
	) {}

	@Post()
	async create(@Body(ValidationPipe) addInventoryItemDto: AddInventoryItemDto) {
		const warehouseExist = this.warehousesService.exist(addInventoryItemDto.warehouseId as any);
		if (!warehouseExist) {
			throw new BadRequestException("This warehouse doesn't exist");
		}

		const productExist = this.productService.exist(addInventoryItemDto.productId as any);
		if (!productExist) {
			throw new BadRequestException("This product doesn't exist");
		}

		const item = await this.inventoryService.create(addInventoryItemDto);
		return InventoryItem.toBasicDto(item);
	}

	@Get('by-product')
	async findByProduct(
		@Query('warehouseId', ParseObjectIdPipe) warehouseId: Types.ObjectId,
		@Query('productId', ParseObjectIdPipe) productId: Types.ObjectId,
	): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findByProduct(warehouseId, productId);

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

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findOne(id);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}
}
