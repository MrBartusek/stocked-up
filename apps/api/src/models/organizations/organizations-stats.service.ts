import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Types } from 'mongoose';
import { OrgRecalculateJobData } from './types/org-recalculate-job-data';

@Injectable()
export class OrganizationsStatsService {
	constructor(
		@InjectQueue('org-recalculate') private recalculateQueue: Queue<OrgRecalculateJobData>,
	) {}

	/**
	 * Sums totalValue of each warehouse and sets this value as total organization value.
	 * This function does not trigger warehouses recalculation
	 */
	async updateTotalValue(id: Types.ObjectId): Promise<Job<OrgRecalculateJobData>> {
		return await this.recalculateQueue.add(
			{ organization: id },
			{ jobId: `recalculate:organization:${id.toString()}`, delay: 3000 },
		);
	}
}
