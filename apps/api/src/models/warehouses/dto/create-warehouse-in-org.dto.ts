import { Type } from 'class-transformer';
import { IsMongoId, ValidateNested } from 'class-validator';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { ICreateWarehouseInOrgDto } from 'shared-types';

export class CreateWarehouseInOrgDto implements ICreateWarehouseInOrgDto {
	@IsMongoId()
	organizationId: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}
