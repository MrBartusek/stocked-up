import { Injectable } from '@nestjs/common';
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	isMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { OrganizationsService } from '../models/organizations/organizations.service';

@ValidatorConstraint({ name: 'OrganizationExist', async: true })
@Injectable()
export class OrganizationExistRule implements ValidatorConstraintInterface {
	constructor(private readonly organizationsService: OrganizationsService) {}

	async validate(value: string) {
		if (!isMongoId(value)) return false;
		const id = new Types.ObjectId(value);
		const exist = await this.organizationsService.exist(id);
		return exist;
	}

	defaultMessage(args: ValidationArguments) {
		return `Organization (${args.value}) doesn't exist`;
	}
}
