import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Types } from 'mongoose';
import { PageDto, WarehouseDto } from 'shared-types';
import { PageQueryDto } from '../../dto/page-query.dto';
import { InventoryService } from '../inventory/inventory.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseCreatedEvent } from './events/warehouse-created.event';
import { WarehouseDeletedEvent } from './events/warehouse-deleted.event';
import { WarehouseUpdatedEvent } from './events/warehouse-updated.event';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { WarehouseRepository } from './warehouse.repository';
import { WarehouseRecalculatedEvent } from './events/warehouse-recalculated.event';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class WarehousesService {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly warehouseRepository: WarehouseRepository,
		private readonly inventoryService: InventoryService,
		private readonly organizationsService: OrganizationsService,
	) {}

	private readonly logger = new Logger(WarehousesService.name);

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

	paginate(
		orgId: Types.ObjectId,
		query: PageQueryDto<WarehouseDto>,
	): Promise<PageDto<WarehouseDocument>> {
		return this.warehouseRepository.paginate({ organization: orgId }, query);
	}

	async recalculateTotalValue(id: Types.ObjectId): Promise<WarehouseDocument | null> {
		const warehouse = await this.warehouseRepository.findById(id);
		if (!warehouse) return null;

		const organization = await this.organizationsService.findById(warehouse.organization);
		if (!organization) return null;

		const strategy = organization.settings.valueCalculationStrategy;
		const value = await this.inventoryService.calculateStockValue(warehouse._id, strategy);

		const newWarehouse = await this.warehouseRepository.findOneByIdAndUpdate(id, {
			totalValue: value,
		});
		if (!newWarehouse) return null;

		const event = new WarehouseRecalculatedEvent(newWarehouse);
		this.eventEmitter.emit('warehouse.recalculated', event);
		this.logger.log(`Recalculated warehouse {${warehouse._id},${value}$}`);

		return newWarehouse;
	}
}
