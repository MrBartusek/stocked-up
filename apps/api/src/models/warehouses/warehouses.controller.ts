import {
	BadRequestException,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PageDto, WarehouseDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { PageQueryValidationPipe } from '../../pipes/page-query-validation.pipe';
import { ParseObjectIdPipe } from '../../pipes/prase-object-id.pipe';
import { HasOrganizationAccessPipe } from '../../security/pipes/has-organization-access.pipe';
import { HasWarehouseAccessPipe } from '../../security/pipes/has-warehouse-access.pipe';
import { SecurityValidationPipe } from '../../security/pipes/security-validation.pipe';
import { CreateWarehouseInOrgDto } from './dto/create-warehouse-in-org.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './schemas/warehouse.schema';
import { WarehousesService } from './warehouses.service';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehousesController {
	constructor(private readonly warehousesService: WarehousesService) {}

	@Post()
	@ApiOperation({ summary: 'Create new warehouse in organization' })
	async create(@Body(SecurityValidationPipe) dto: CreateWarehouseInOrgDto): Promise<WarehouseDto> {
		const orgId = new Types.ObjectId(dto.organizationId);
		const warehouse = await this.warehousesService.create(orgId, dto.warehouse);
		return Warehouse.toDto(warehouse);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get warehouse by id' })
	async findOne(
		@Param('id', ParseObjectIdPipe, HasWarehouseAccessPipe) id: Types.ObjectId,
	): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.findById(id);

		if (!warehouse) throw new NotFoundException();

		return Warehouse.toDto(warehouse);
	}

	@Get('list/:id')
	@ApiOperation({ summary: 'List warehouses in organization' })
	async list(
		@Param('id', ParseObjectIdPipe, HasOrganizationAccessPipe) orgId: Types.ObjectId,
		@Query(
			new PageQueryValidationPipe<WarehouseDto>({
				allowedFilters: ['name', 'totalValue', 'address'],
			}),
		)
		pageQuery: PageQueryDto<WarehouseDto>,
	): Promise<PageDto<WarehouseDto>> {
		const { items, meta } = await this.warehousesService.paginateByOrg(orgId, pageQuery);

		const warehouseDTOs = items.map((warehouse) => Warehouse.toDto(warehouse));
		return {
			meta,
			items: warehouseDTOs,
		};
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update warehouses by id' })
	async update(
		@Param('id', ParseObjectIdPipe, HasWarehouseAccessPipe) id: Types.ObjectId,
		@Body(SecurityValidationPipe) dto: UpdateWarehouseDto,
	): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.update(id, dto);

		if (!warehouse) throw new NotFoundException();

		return Warehouse.toDto(warehouse);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete warehouses by id' })
	async delete(
		@Param('id', ParseObjectIdPipe, HasWarehouseAccessPipe) id: Types.ObjectId,
	): Promise<WarehouseDto> {
		const warehouse = await this.warehousesService.findById(id);
		if (!warehouse) throw new NotFoundException();

		const allWarehouses = await this.warehousesService.findByOrg(warehouse.organization);
		if (allWarehouses.length < 2) {
			throw new BadRequestException(
				'Cannot delete warehouse, organizations need to have at least one warehouse.',
			);
		}

		await this.warehousesService.delete(id);
		return Warehouse.toDto(warehouse);
	}
}
