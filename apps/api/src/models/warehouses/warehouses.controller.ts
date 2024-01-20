import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PageDto, WarehouseDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { OrganizationsStatsService } from '../organizations/organizations-stats.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreateWarehouseInOrgDto } from './dto/create-warehouse-in-org.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehousesController {
	constructor(
		private readonly warehousesService: WarehousesService,
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsStatsService: OrganizationsStatsService,
	) {}

	@Post()
	async create(@Body() dto: CreateWarehouseInOrgDto): Promise<WarehouseDto> {
		const orgId = new Types.ObjectId(dto.organizationId);

		const orgExist = this.organizationsService.exist(orgId);
		if (!orgExist) {
			throw new NotFoundException("Organization with provided id doesn't exist");
		}

		const warehouse = await this.warehousesService.create(orgId, dto.warehouse);
		await this.organizationsService.addWarehouseReference(orgId, warehouse);

		return Warehouse.toDto(warehouse);
	}

	@Get(':id')
	async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.findById(id);
		if (!warehouse) {
			throw new NotFoundException();
		}

		return Warehouse.toDto(warehouse);
	}

	@Get('list/:id')
	async list(
		@Param('id', ParseObjectIdPipe) orgId: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<WarehouseDto>({
				allowedFilters: ['name', 'totalValue', 'address'],
			}),
		)
		pageQuery: PageQueryDto<WarehouseDto>,
	): Promise<PageDto<WarehouseDto>> {
		const { items, meta } = await this.warehousesService.paginate(orgId, pageQuery);

		const warehouseDTOs = items.map((warehouse) => Warehouse.toDto(warehouse));
		return {
			meta,
			items: warehouseDTOs,
		};
	}

	@Put(':id')
	async update(
		@Param('id', ParseObjectIdPipe) id: Types.ObjectId,
		@Body() dto: UpdateWarehouseDto,
	): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.update(id, dto);
		if (!warehouse) {
			throw new NotFoundException();
		}

		await this.organizationsService.updateWarehouseReference(warehouse);

		return Warehouse.toDto(warehouse);
	}

	@Delete(':id')
	async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.delete(id);
		if (!warehouse) {
			throw new NotFoundException();
		}

		const org = await this.organizationsService.deleteWarehouseReference(warehouse._id);
		await this.organizationsStatsService.recalculateTotalValue(org._id);

		return Warehouse.toDto(warehouse);
	}
}
