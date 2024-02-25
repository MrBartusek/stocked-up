import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Types } from 'mongoose';
import { OrgRecalculateJobData } from './types/org-recalculate-job-data';
import { ProductsCountJobData } from './types/products-count-job-data';

@Injectable()
export class OrganizationsStatsService {
	constructor(
		@InjectQueue('org-recalculate') private recalculateQueue: Queue<OrgRecalculateJobData>,
		@InjectQueue('products-count') private countQueue: Queue<ProductsCountJobData>,
	) {}

	/**
	 * Adds job to sum totalValue of each warehouse and set this value
	 * as total organization value.
	 * This function does not trigger warehouses recalculation.
	 */
	async updateTotalValue(id: Types.ObjectId): Promise<Job<OrgRecalculateJobData>> {
		return await this.recalculateQueue.add(
			{ organization: id },
			{ jobId: `recalculate:organization:${id.toString()}` },
		);
	}

	/**
	 * Adds job to recalculate total products count for specified organization
	 *
	 * @param id organization to update
	 */
	async updateProductsCount(id: Types.ObjectId): Promise<Job<ProductsCountJobData>> {
		return await this.countQueue.add(
			{ organization: id },
			{ jobId: `recalculate:products-count:${id.toString()}` },
		);
	}
}
