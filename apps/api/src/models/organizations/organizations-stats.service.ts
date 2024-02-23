import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OrganizationRepository } from './organizations.repository';

@Injectable()
export class OrganizationsStatsService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

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
}
