import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Types } from 'mongoose';
import * as crypto from 'node:crypto';
import Utils from '../helpers/utils';
import { InventoryService } from '../models/inventory/inventory.service';
import { OrganizationsAclService } from '../models/organizations/organizations-acl.service';
import { OrganizationsStatsService } from '../models/organizations/organizations-stats.service';
import { OrganizationsService } from '../models/organizations/organizations.service';
import { OrganizationDocument } from '../models/organizations/schemas/organization.schema';
import { ProductsService } from '../models/products/products.service';
import { ProductDocument } from '../models/products/schemas/product.schema';
import { UserDocument } from '../models/users/schemas/user.schema';
import { UsersService } from '../models/users/users.service';
import { WarehousesService } from '../models/warehouses/warehouses.service';
import DEMO_CONFIG from './demo.config';
import { OrganizationSecurityRole } from 'shared-types';

@Injectable()
export class DemoService {
	constructor(
		private readonly userService: UsersService,
		private readonly organizationsService: OrganizationsService,
		private readonly organizationsStatsService: OrganizationsStatsService,
		private readonly organizationsRolesService: OrganizationsAclService,
		private readonly warehousesService: WarehousesService,
		private readonly productsService: ProductsService,
		private readonly inventoryService: InventoryService,
	) {}

	private readonly logger = new Logger(DemoService.name);

	@Cron(CronExpression.EVERY_HOUR)
	async purgeDemoAccounts(): Promise<void> {
		const UNIX_24_HOURS = 24 * 60 * 60 * 1000;
		const demoAccountCutoff = new Date(Date.now() - UNIX_24_HOURS);

		const demoAccountsToDelete = await this.userService.find({
			'profile.isDemo': true,
			createdAt: { $lte: demoAccountCutoff },
		});

		for await (const account of demoAccountsToDelete) {
			const user = await this.userService.delete(account._id);
			this.logger.log(
				`Purged stale demo account: ${user.profile.username} (${user.profile.email})`,
			);
		}
	}

	async setupDemoAccount(): Promise<UserDocument> {
		const key = this.generateDemoKey();

		const user = await this.createUser(key);
		const org = await this.createOrganizationAndWarehouses(key);

		const products = await this.createProductDefinitions(org._id);
		await this.randomlyDistributeInventory(org, products);
		await this.updateStats(org._id);

		await this.organizationsRolesService.addRule(org._id, {
			user: user._id,
			role: OrganizationSecurityRole.OWNER,
		});

		this.logger.log(`Created demo account - ${user.profile.email}`);
		return user;
	}

	private async createUser(key: string) {
		return this.userService.create({
			username: `Demo-${key}`,
			email: `demo-${key}@dokurno.dev`,
			isDemo: true,
			isActive: true,
		});
	}

	private async createOrganizationAndWarehouses(key: string) {
		const warehouseNames = [...DEMO_CONFIG.warehouses];
		const organization = await this.organizationsService.create({
			name: `Auto Pro Parts (${key})`,
			warehouse: {
				name: '',
			},
		});

		let finalOrg = organization;
		for await (const name of warehouseNames) {
			const warehouse = await this.warehousesService.create(organization._id, { name });
			finalOrg = await this.organizationsService.addWarehouseReference(organization._id, warehouse);
		}
		return finalOrg;
	}

	private async createProductDefinitions(organization: Types.ObjectId): Promise<ProductDocument[]> {
		const result: ProductDocument[] = [];
		for await (const product of DEMO_CONFIG.products) {
			const document = await this.productsService.create({
				organization: organization.toString(),
				...product,
			});
			result.push(document);
		}
		return result;
	}

	private async randomlyDistributeInventory(
		organization: OrganizationDocument,
		products: ProductDocument[],
	): Promise<void> {
		for await (const warehouseReference of organization.warehouses) {
			const randomProducts = this.pickRandomNProducts(products, Utils.randomRange(8, 25));

			for await (const randomProduct of randomProducts) {
				await this.inventoryService.create({
					organizationId: organization._id.toString(),
					warehouseId: warehouseReference.id.toString(),
					productId: randomProduct._id.toString(),
					quantity: Utils.randomRange(0, 200),
				});
			}
		}
	}

	private async updateStats(organizationId: Types.ObjectId) {
		await this.organizationsStatsService.updateProductsCount(
			organizationId,
			DEMO_CONFIG.products.length,
		);
		await this.organizationsStatsService.recalculateTotalValue(organizationId);
	}

	private pickRandomNProducts(products: ProductDocument[], count: number): ProductDocument[] {
		const randomProducts = [...products].sort(() => Math.random() - 0.5);
		return randomProducts.slice(0, count);
	}

	private generateDemoKey(bytes = 3) {
		return crypto.randomBytes(bytes).toString('hex');
	}
}
