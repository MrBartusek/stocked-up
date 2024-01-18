import { Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';
import { CreateWarehouseDto, ICreateOrganizationDto } from 'shared-types';

export class CreateOrganizationDto implements ICreateOrganizationDto {
	@Length(2, 32)
	name: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}
