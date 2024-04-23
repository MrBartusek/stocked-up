import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Types } from 'mongoose';
import { ProductsService } from '../../products/products.service';
import { OrganizationsService } from '../organizations.service';
import { ProductsCountJobData } from '../types/products-count-job-data';

@Processor('products-count')
export class ProductsCountProcessor {
	constructor(
		private readonly organizationService: OrganizationsService,
		private readonly productsService: ProductsService,
	) {}

	private readonly logger = new Logger(ProductsCountProcessor.name);

	@Process()
	async handleCount(job: Job<ProductsCountJobData>): Promise<void> {
		const orgId = new Types.ObjectId(job.data.organization);

		const totalProduct = await this.productsService.countAll(orgId);
		await this.organizationService.update(orgId, { 'stats.totalProducts': totalProduct });

		this.logger.log(`Updated total org products {${orgId},${totalProduct}}`);
	}
}
