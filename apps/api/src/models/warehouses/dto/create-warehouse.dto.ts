import { IsOptional, IsString, Length } from 'class-validator';
import { ICreateWarehouseDto } from 'shared-types';

export class CreateWarehouseDto implements ICreateWarehouseDto {
	@IsString()
	@Length(4, 64)
	name: string;

	@IsOptional()
	@Length(4, 64)
	@IsString()
	address?: string;
}
