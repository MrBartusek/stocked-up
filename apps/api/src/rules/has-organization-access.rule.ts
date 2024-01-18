import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { OrganizationsService } from '../models/organizations/organizations.service';

@ValidatorConstraint({ name: 'HasOrganizationAccessRule', async: true })
@Injectable()
export class HasOrganizationAccessRule implements ValidatorConstraintInterface {
	constructor(private readonly organizationsService: OrganizationsService) {}

	async validate(value: string) {
		if (!isMongoId(value)) return false;
		const id = new Types.ObjectId(value);
		const exist = await this.organizationsService.exist(id);
		return exist;
	}

	defaultMessage() {
		return `You don't have access to specified organization or it doesn't exist`;
	}
}
