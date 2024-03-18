import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ICreateWarehouseDto } from 'shared-types';

export class CreateWarehouseDto implements ICreateWarehouseDto {
	@IsString()
	@Length(4, 64)
	name: string;

	@IsOptional()
	@IsNotEmpty()
	@MaxLength(64)
	@IsString()
	address?: string;
}
