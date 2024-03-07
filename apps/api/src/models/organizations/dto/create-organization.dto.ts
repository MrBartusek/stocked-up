import { Type } from 'class-transformer';
import { IsString, Length, Validate, ValidateNested } from 'class-validator';
import { ICreateOrganizationDto } from 'shared-types';
import { OrganizationNameNotTakenRule } from '../../../rules/org-name-not-taken.rule';
import { CreateWarehouseDto } from '../../warehouses/dto/create-warehouse.dto';

export class CreateOrganizationDto implements ICreateOrganizationDto {
	@IsString()
	@Length(4, 64)
	@Validate(OrganizationNameNotTakenRule)
	name: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}
