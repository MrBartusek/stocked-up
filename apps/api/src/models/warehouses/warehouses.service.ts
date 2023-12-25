import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateWarehouseDto, UpdateWarehouseDto } from 'shared-types';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class WarehousesService {
	constructor(
		private readonly warehouseRepository: WarehouseRepository,
		private readonly inventoryService: InventoryService,
	) {}

	create(createWarehouseDto: CreateWarehouseDto): Promise<WarehouseDocument> {
		return this.warehouseRepository.create({
			name: createWarehouseDto.name,
			address: createWarehouseDto.address,
		});
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
}
