import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { OrganizationsService } from '../models/organizations/organizations.service';
import { ProductsService } from '../models/products/products.service';

@ValidatorConstraint({ name: 'HasProductAccessRule', async: true })
@Injectable()
export class HasProductAccessRule implements ValidatorConstraintInterface {
	constructor(
		private readonly organizationsService: OrganizationsService,
		private readonly productsService: ProductsService,
	) {}

	async validate(value: string) {
		if (!isMongoId(value)) return false;
		const id = new Types.ObjectId(value);
		const org = await this.productsService.getOrganizationFromProduct(id);
		const exist = await this.organizationsService.exist(org);
		return exist;
	}

	defaultMessage() {
		return `You don't have access to specified product or it doesn't exist`;
	}
}
