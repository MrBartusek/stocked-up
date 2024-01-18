import { Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';
import { ICreateOrganizationDto } from 'shared-types';
import { CreateWarehouseDto } from '../../warehouses/dto/create-warehouse.dto';

export class CreateOrganizationDto implements ICreateOrganizationDto {
	@Length(2, 32)
	name: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}
