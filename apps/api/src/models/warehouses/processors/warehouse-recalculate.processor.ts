import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { InventoryService } from '../../inventory/inventory.service';
import { OrganizationsService } from '../../organizations/organizations.service';
import { WarehouseRecalculatedEvent } from '../events/warehouse-recalculated.event';
import { WarehouseRecalculateJobData } from '../types/warehouse-recalculate-job-data.type';
import { WarehousesService } from '../warehouses.service';

@Processor('warehouse-recalculate')
export class WarehouseRecalculateProcessor {
	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly warehouseService: WarehousesService,
		private readonly organizationsService: OrganizationsService,
		private readonly inventoryService: InventoryService,
	) {}

	@Process()
	async handleRecalculate(job: Job<WarehouseRecalculateJobData>): Promise<void> {
		const warehouseId = job.data.warehouse;

		const warehouse = await this.warehouseService.findById(warehouseId);
		if (!warehouse) return null;
		const organization = await this.organizationsService.findById(warehouse.organization);
		if (!organization) return null;

		const strategy = organization.settings.valueCalculationStrategy;
		const totalValue = await this.inventoryService.calculateStockValue(warehouse._id, strategy);
		const totalQuantity = await this.inventoryService.calculateTotalQuantity(warehouse._id);

		const newWarehouse = await this.warehouseService.updateStats(warehouseId, {
			totalValue,
			totalQuantity,
		});

		const event = new WarehouseRecalculatedEvent(newWarehouse);
		this.eventEmitter.emit('warehouse.recalculated', event);
	}
}
