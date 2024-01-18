import { Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';
import { CreateWarehouseDto, ICreateOrganizationDto } from 'shared-types';

class CreateOrganizationDto implements ICreateOrganizationDto {
	@Length(2, 32)
	name: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}

export default CreateOrganizationDto;
