import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { OrganizationsService } from '../models/organizations/organizations.service';

@ValidatorConstraint({ name: 'HasOrganizationAccessRule', async: true })
@Injectable()
export class OrganizationNameNotTakenRule implements ValidatorConstraintInterface {
	constructor(private readonly organizationsService: OrganizationsService) {}

	async validate(value: string) {
		const taken = await this.organizationsService.nameTaken(value);
		return !taken;
	}

	defaultMessage() {
		return `This organization name is already taken`;
	}
}
