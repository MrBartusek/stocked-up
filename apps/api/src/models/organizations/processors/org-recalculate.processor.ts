import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WarehousesService } from '../../warehouses/warehouses.service';
import { OrganizationsService } from '../organizations.service';
import { OrgRecalculateJobData } from '../types/org-recalculate-job-data';

@Processor('org-recalculate')
export class OrgRecalculateProcessor {
	constructor(
		private readonly organizationService: OrganizationsService,
		private readonly warehousesService: WarehousesService,
	) {}

	private readonly logger = new Logger(OrgRecalculateProcessor.name);

	@Process()
	async handleRecalculate(job: Job<OrgRecalculateJobData>): Promise<void> {
		const orgId = job.data.organization;
		const organization = await this.organizationService.findById(orgId);
		if (!organization) return null;

		let totalValue = 0;
		let totalQuantity = 0;

		const warehousesList = organization.warehouses;
		for (const warehouseRef of warehousesList) {
			const warehouse = await this.warehousesService.findById(warehouseRef.id);
			totalValue += warehouse.totalValue;
			totalQuantity += warehouse.totalQuantity;
		}

		await this.organizationService.update(orgId, {
			'stats.totalValue': totalValue,
			'stats.totalQuantity': totalQuantity,
		});
		const logData = `{${orgId},val: ${totalValue}$, qty: ${totalQuantity}}`;
		this.logger.log(`Recalculated organization ${logData}`);
	}
}
