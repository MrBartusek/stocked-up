import { IsOptional, Length } from 'class-validator';
import { ICreateWarehouseDto } from 'shared-types';

export class CreateWarehouseDto implements ICreateWarehouseDto {
	@Length(2, 32)
	name: string;

	@Length(2, 32)
	@IsOptional()
	address?: string;
}
