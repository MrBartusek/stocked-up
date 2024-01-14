import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { WarehouseStatsService } from '../warehouses/warehouses-stats.service';
import { OrganizationRepository } from './organizations.repository';
import { Types } from 'mongoose';

@Injectable()
export class OrganizationsStatsService {
	constructor(
		private readonly organizationRepository: OrganizationRepository,
		private readonly warehouseStatsService: WarehouseStatsService,
	) {}

	private readonly logger = new Logger(OrganizationsStatsService.name);

	async updateProductsCount(id: mongoose.Types.ObjectId | string, count: number) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ $set: { 'stats.totalProducts': count } },
		);
	}

	async updatePendingOrders(id: mongoose.Types.ObjectId | string, count: number) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ $set: { 'stats.totalPendingOrders': count } },
		);
	}

	async recalculateTotalValue(orgId: mongoose.Types.ObjectId) {
		const start = performance.now();

		const organization = await this.organizationRepository.findById(orgId);
		if (!organization) {
			throw new Error('Organization with provide id was not found');
		}

		this.logger.log(
			`Triggered organization value recalculation for org ${organization.name} (${orgId})`,
		);

		let totalOrgValue = 0;
		for await (const warehouseRef of organization.warehouses) {
			totalOrgValue += await this.warehouseStatsService.recalculateWarehouseValue(
				warehouseRef.id,
				organization.settings.valueCalculationStrategy,
			);
		}

		const end = performance.now();
		this.logger.log(
			`Calculated total value $${totalOrgValue} for org ${orgId} took ${Math.round(end - start)}ms`,
		);

		return this.organizationRepository.findOneAndUpdate(
			{ _id: orgId },
			{ $set: { 'stats.totalValue': totalOrgValue } },
		);
	}
}
