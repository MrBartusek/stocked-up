import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OrganizationRepository } from './organizations.repository';

@Injectable()
export class OrganizationsStatsService {
	constructor(private readonly organizationRepository: OrganizationRepository) {}

	async updateProductsCount(id: mongoose.Types.ObjectId | string, count: number) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ stats: { totalProducts: count } },
		);
	}

	async updateTotalValue(id: mongoose.Types.ObjectId | string, count: number) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ stats: { totalValue: count } },
		);
	}

	async updatePendingOrders(id: mongoose.Types.ObjectId | string, count: number) {
		return this.organizationRepository.findOneAndUpdate(
			{ _id: id },
			{ stats: { totalPendingOrders: count } },
		);
	}
}
