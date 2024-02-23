import { Injectable, Logger } from '@nestjs/common';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationsService } from './organizations.service';
import { Types } from 'mongoose';
import { OrganizationDocument } from './schemas/organization.schema';

@Injectable()
export class OrganizationsStatsService {
	constructor(
		private readonly organizationService: OrganizationsService,
		private readonly warehousesService: WarehousesService,
	) {}

	private readonly logger = new Logger(OrganizationsStatsService.name);

	/**
	 * Calls recalculateTotalValue on each organization's warehouse with specified id.
	 * This function directly does not update the organization value, it's rather done
	 * in listener since this process is event-based.
	 *
	 * @returns organization with provided id or null if not found
	 */
	async triggerWarehousesRecalculation(id: Types.ObjectId): Promise<OrganizationDocument | null> {
		const organization = await this.organizationService.findById(id);
		if (!organization) return null;

		const warehousesList = organization.warehouses;
		for (const warehouse of warehousesList) {
			await this.warehousesService.recalculateTotalValue(warehouse.id);
		}

		return organization;
	}

	/**
	 * Sums totalValue of each warehouse and sets this value as total organization value.
	 * This function does not trigger warehouses recalculation
	 *
	 * @returns organization with provided id or null if not found
	 */
	async updateTotalValue(id: Types.ObjectId): Promise<OrganizationDocument | null> {
		const organization = await this.organizationService.findById(id);
		if (!organization) return null;

		let totalValue = 0;

		const warehousesList = organization.warehouses;
		for (const warehouseRef of warehousesList) {
			const warehouse = await this.warehousesService.findById(warehouseRef.id);
			totalValue += warehouse.totalValue;
		}

		this.logger.log(`Recalculated organization {${id},${totalValue}$}`);
		return this.organizationService.update(id, { 'stats.totalValue': totalValue });
	}
}
