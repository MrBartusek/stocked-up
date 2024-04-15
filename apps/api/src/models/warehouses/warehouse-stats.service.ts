import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Types } from 'mongoose';
import { WarehouseRecalculateJobData } from './types/warehouse-recalculate-job-data.type';

@Injectable()
export class WarehouseStatsService {
	constructor(
		@InjectQueue('warehouse-recalculate')
		private recalculateQueue: Queue<WarehouseRecalculateJobData>,
	) {}

	async recalculateTotalValue(id: Types.ObjectId): Promise<Job<WarehouseRecalculateJobData>> {
		return await this.recalculateQueue.add(
			{ warehouse: id },
			{ jobId: `recalculate:warehouse:${id.toString()}` },
		);
	}
}
