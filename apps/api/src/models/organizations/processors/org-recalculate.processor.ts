import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrgRecalculateJobData } from '../types/org-recalculate-job-data';
import { OrganizationsService } from '../organizations.service';
import { WarehousesService } from '../../warehouses/warehouses.service';

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

		const warehousesList = organization.warehouses;
		for (const warehouseRef of warehousesList) {
			const warehouse = await this.warehousesService.findById(warehouseRef.id);
			totalValue += warehouse.totalValue;
		}

		await this.organizationService.update(orgId, { 'stats.totalValue': totalValue });
		this.logger.log(`Recalculated organization {${orgId},${totalValue}$}`);
	}
}
