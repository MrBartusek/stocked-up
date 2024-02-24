import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Types } from 'mongoose';
import { WarehousesService } from '../warehouses/warehouses.service';
import { OrganizationsService } from './organizations.service';
import { OrganizationDocument } from './schemas/organization.schema';
import { OrgRecalculateJobData } from './types/org-recalculate-job-data';

@Injectable()
export class OrganizationsStatsService {
	constructor(
		private readonly organizationService: OrganizationsService,
		private readonly warehousesService: WarehousesService,
		@InjectQueue('org-recalculate') private recalculateQueue: Queue<OrgRecalculateJobData>,
	) {}

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
	 */
	async updateTotalValue(id: Types.ObjectId): Promise<Job<OrgRecalculateJobData>> {
		return await this.recalculateQueue.add(
			{ organization: id },
			{ jobId: `recalculate:${id.toString()}`, delay: 1000 },
		);
	}
}
