import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PageDto, WarehouseDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { InventoryService } from '../inventory/inventory.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehousesService {
	constructor(
		private readonly warehouseRepository: WarehouseRepository,
		private readonly inventoryService: InventoryService,
	) {}

	create(organization: Types.ObjectId, dto: CreateWarehouseDto): Promise<WarehouseDocument> {
		return this.warehouseRepository.create({ organization, ...dto });
	}

	update(id: Types.ObjectId, dto: UpdateWarehouseDto): Promise<WarehouseDocument | undefined> {
		return this.warehouseRepository.findOneByIdAndUpdate(id, dto);
	}

	findById(id: Types.ObjectId): Promise<WarehouseDocument | undefined> {
		return this.warehouseRepository.findById(id);
	}

	async delete(id: Types.ObjectId): Promise<WarehouseDocument | null> {
		const warehouse = await this.warehouseRepository.deleteOneById(id);
		if (!warehouse) return null;
		await this.inventoryService.deleteManyByWarehouse(warehouse._id);
		return warehouse;
	}

	exist(id: Types.ObjectId) {
		return this.warehouseRepository.exist({ _id: id });
	}

	paginate(
		orgId: Types.ObjectId,
		query: PageQueryDto<WarehouseDto>,
	): Promise<PageDto<WarehouseDocument>> {
		return this.warehouseRepository.paginate({ organization: orgId }, query);
	}
}
