import { Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { OrganizationsService } from '../models/organizations/organizations.service';
import * as crypto from 'node:crypto';
import { WarehousesService } from '../models/warehouses/warehouses.service';
import { ProductsService } from '../models/products/products.service';
import { InventoryService } from '../models/inventory/inventory.service';
import { UserProfile } from '../models/users/schemas/user-profile.schema';
import { User, UserDocument } from '../models/users/schemas/user.schema';

@Injectable()
export class DemoService {
	constructor(
		private readonly userService: UsersService,
		private readonly organizationsService: OrganizationsService,
		private readonly warehousesService: WarehousesService,
		private readonly productsService: ProductsService,
		private readonly inventoryService: InventoryService,
	) {}

	async setupDemoAccount(): Promise<UserDocument> {
		const key = this.generateDemoKey();
		const user = await this.createUser(key);
		const org = await this.createOrganizationAndWarehouses(key);
		await this.organizationsService.updateAcl(org._id, user._id, 'admin');

		return user;
	}

	private async createOrganizationAndWarehouses(key: string) {
		const organization = await this.organizationsService.create({
			name: `Auto Pro Parts (${key})`,
			warehouse: {
				name: 'City Centre Store',
			},
		});
		const warehouseNames = ['Suburbs store', 'Main warehouse', 'Online store warehouse'];
		for await (const name of warehouseNames) {
			const warehouse = await this.warehousesService.create({ name });
			this.organizationsService.addWarehouseReference(organization._id, warehouse);
		}
		return this.organizationsService.findById(organization._id);
	}

	private async createUser(key: string) {
		return this.userService.create({
			username: `Demo-${key}`,
			email: `demo-${key}@dokurno.dev`,
			isDemo: true,
		});
	}

	private generateDemoKey(bytes = 3) {
		return crypto.randomBytes(bytes).toString('hex');
	}
}
