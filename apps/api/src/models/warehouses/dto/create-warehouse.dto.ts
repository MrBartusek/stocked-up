import { IsNotEmpty, IsOptional, IsString, Length, Max, isNotEmpty } from 'class-validator';
import { ICreateWarehouseDto } from 'shared-types';

export class CreateWarehouseDto implements ICreateWarehouseDto {
	@IsString()
	@Length(4, 64)
	name: string;

	@IsOptional()
	@IsNotEmpty()
	@Max(64)
	@IsString()
	address?: string;
}
