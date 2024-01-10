import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import * as crypto from 'node:crypto';
import { InventoryService } from '../models/inventory/inventory.service';
import { OrganizationsService } from '../models/organizations/organizations.service';
import { ProductsService } from '../models/products/products.service';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { WarehousesService } from '../models/warehouses/warehouses.service';
import DEMO_CONFIG from './demo.config';
import { OrganizationsStatsService } from '../models/organizations/organizations-stats.service';

@Injectable()
export class DemoService {
	constructor(
		private readonly userService: UsersService,
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsStatsService: OrganizationsStatsService,
		private readonly warehousesService: WarehousesService,
		private readonly productsService: ProductsService,
		private readonly inventoryService: InventoryService,
	) {}

	private readonly logger = new Logger(DemoService.name);

	async setupDemoAccount(): Promise<UserDocument> {
		const key = this.generateDemoKey();

		const user = await this.createUser(key);
		const org = await this.createOrganizationAndWarehouses(key);

		await this.createProductDefinitions(org._id);
		await this.updateStats(org._id);
		await this.organizationsService.updateAcl(org._id, user._id, 'admin');

		this.logger.log(`Created demo account - ${user.profile.email}`);
		return user;
	}

	private async createUser(key: string) {
		return this.userService.create({
			username: `Demo-${key}`,
			email: `demo-${key}@dokurno.dev`,
			isDemo: true,
		});
	}

	private async createOrganizationAndWarehouses(key: string) {
		const warehouseNames = [...DEMO_CONFIG.warehouses];
		const organization = await this.organizationsService.create({
			name: `Auto Pro Parts (${key})`,
			warehouse: {
				name: warehouseNames.shift(),
			},
		});

		for await (const name of warehouseNames) {
			const warehouse = await this.warehousesService.create({ name });
			this.organizationsService.addWarehouseReference(organization._id, warehouse);
		}
		return this.organizationsService.findById(organization._id);
	}

	private async createProductDefinitions(organizationId: Types.ObjectId): Promise<void> {
		for await (const product of DEMO_CONFIG.products) {
			await this.productsService.create({ organizationId: organizationId.toString(), ...product });
		}
	}

	private async updateStats(organizationId: Types.ObjectId) {
		await this.organizationsStatsService.updateProductsCount(
			organizationId,
			DEMO_CONFIG.products.length,
		);
		await this.organizationsStatsService.recalculateTotalValue(organizationId);
	}

	private generateDemoKey(bytes = 3) {
		return crypto.randomBytes(bytes).toString('hex');
	}
}
