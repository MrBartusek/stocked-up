import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Types } from 'mongoose';
import { PageDto, WarehouseDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseCreatedEvent } from './events/warehouse-created.event';
import { WarehouseDeletedEvent } from './events/warehouse-deleted.event';
import { WarehouseUpdatedEvent } from './events/warehouse-updated.event';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';

@Injectable()
export class WarehousesService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly warehouseRepository: WarehouseRepository,
	) {}

	async create(organization: Types.ObjectId, dto: CreateWarehouseDto): Promise<WarehouseDocument> {
		const warehouse = await this.warehouseRepository.create({ organization, ...dto });

		const event = new WarehouseCreatedEvent(warehouse);
		this.eventEmitter.emit('warehouse.created', event);

		return warehouse;
	}

	async update(id: Types.ObjectId, dto: UpdateWarehouseDto): Promise<WarehouseDocument | null> {
		const warehouse = await this.warehouseRepository.findOneByIdAndUpdate(id, dto);
		if (!warehouse) return null;

		const event = new WarehouseUpdatedEvent(warehouse);
		this.eventEmitter.emit('warehouse.updated', event);

		return warehouse;
	}

	async updateStats(
		id: Types.ObjectId,
		stats: { totalValue: number; totalQuantity: number },
	): Promise<WarehouseDocument | null> {
		return await this.warehouseRepository.findOneByIdAndUpdate(id, { ...stats });
	}

	findById(id: Types.ObjectId): Promise<WarehouseDocument | undefined> {
		return this.warehouseRepository.findById(id);
	}

	async delete(id: Types.ObjectId): Promise<WarehouseDocument | null> {
		const warehouse = await this.warehouseRepository.deleteOneById(id);
		if (!warehouse) return null;

		const event = new WarehouseDeletedEvent(warehouse);
		this.eventEmitter.emit('warehouse.deleted', event);

		return warehouse;
	}

	exist(id: Types.ObjectId) {
		return this.warehouseRepository.exist({ _id: id });
	}

	findByOrg(organization: Types.ObjectId): Promise<WarehouseDocument[]> {
		return this.warehouseRepository.find({ organization });
	}

	paginateByOrg(
		orgId: Types.ObjectId,
		query: PageQueryDto<WarehouseDto>,
	): Promise<PageDto<WarehouseDocument>> {
		return this.warehouseRepository.paginate({ organization: orgId }, query);
	}
}
