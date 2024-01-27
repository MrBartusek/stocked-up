import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { BasicInventoryItemDto, InventoryItemDto, PageDto } from 'shared-types';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { HasInventoryAccessPipe } from '../../security/pipes/has-inventory-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './schemas/inventory-item.schema';
import { HasWarehouseAccessPipe } from '../../security/pipes/has-warehouse-access.pipe';
import { HasProductAccessPipe } from '../../security/pipes/has-product-access.pipe';

@ApiTags('inventory')
@UseGuards(AuthenticatedGuard)
@Controller('inventory')
export class InventoryController {
	constructor(
		private readonly inventoryService: InventoryService,
		private readonly organizationStatsService: OrganizationsStatsService,
	) {}

	@Post()
	@HttpCode(201)
	async create(@Body(SecurityValidationPipe) dto: CreateInventoryItemDto) {
		const warehouseId = new Types.ObjectId(dto.warehouseId);
		const productId = new Types.ObjectId(dto.productId);

		const itemExist = await this.inventoryService.findByProduct(warehouseId, productId);
		if (itemExist) {
			throw new BadRequestException(
				'The inventory item of this product in this warehouse already exist',
			);
		}

		const item = await this.inventoryService.create(dto);
		await this.organizationStatsService.recalculateTotalValue(item.organization);
	}

	@Put(':id')
	@HttpCode(200)
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body(SecurityValidationPipe) dto: UpdateInventoryItemDto,
	) {
		const item = await this.inventoryService.update(id, dto);
		await this.organizationStatsService.recalculateTotalValue(item.organization);
	}

	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id', ParseObjectIdPipe, HasInventoryAccessPipe) id: Types.ObjectId) {
		const item = await this.inventoryService.delete(id);
		await this.organizationStatsService.recalculateTotalValue(item.organization);
	}

	@Get('by-product')
	async findByProduct(
		@Query('warehouseId', ParseObjectIdPipe, HasWarehouseAccessPipe) warehouseId: Types.ObjectId,
		@Query('productId', ParseObjectIdPipe, HasProductAccessPipe) productId: Types.ObjectId,
	): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findByProduct(warehouseId, productId);

		if (!item) {
			throw new NotFoundException();
		}

		return InventoryItem.toDto(item);
	}

	@Get('by-warehouse/:id')
	async list(
		@Param('id', ParseObjectIdPipe, HasWarehouseAccessPipe) warehouseId: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<BasicInventoryItemDto>({
				allowedFilters: ['quantity'],
				disableTextSearch: true,
			}),
		)
		pageQuery: PageQueryDto<BasicInventoryItemDto>,
	): Promise<PageDto<BasicInventoryItemDto>> {
		const { items, meta } = await this.inventoryService.listByWarehouse(warehouseId, pageQuery);

		const itemDTOs = items.map((product) => InventoryItem.toBasicDto(product));
		return {
			meta,
			items: itemDTOs,
		};
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseObjectIdPipe, HasInventoryAccessPipe) id: Types.ObjectId,
	): Promise<InventoryItemDto> {
		const item = await this.inventoryService.findOne(id);
		return InventoryItem.toDto(item);
	}
}
