import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from 'shared-types';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehousesService {
	constructor(private readonly warehouseRepository: WarehouseRepository) {}

	create(createWarehouseDto: CreateWarehouseDto): Promise<WarehouseDocument> {
		return this.warehouseRepository.create({
			name: createWarehouseDto.name,
			address: createWarehouseDto.address,
		});
	}

	findById(id: string): Promise<WarehouseDocument | undefined> {
		return this.warehouseRepository.findById(id);
	}
}
