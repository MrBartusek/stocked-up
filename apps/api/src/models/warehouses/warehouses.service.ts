import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehousesRepository } from './warehouses.repository';

@Injectable()
export class WarehousesService {
	constructor(private readonly warehousesRepository: WarehousesRepository) {}

	create(createWarehouseDto: CreateWarehouseDto) {
		return this.warehousesRepository.create(createWarehouseDto);
	}

	findAll() {
		return this.warehousesRepository.find(null, { products: 0 });
	}

	findById(id: string) {
		return this.warehousesRepository.findById(id);
	}

	update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
		return this.warehousesRepository.findOneAndUpdate({ _id: id }, updateWarehouseDto);
	}

	remove(id: string) {
		return this.warehousesRepository.deleteOneById(id);
	}
}
