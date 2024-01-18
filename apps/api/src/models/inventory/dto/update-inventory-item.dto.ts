import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { IUpdateInventoryItemDto } from 'shared-types';

export class UpdateInventoryItemDto implements IUpdateInventoryItemDto {
	@IsNumber()
	quantity: number;

	@IsString()
	@Length(1, 32)
	@IsOptional()
	location?: string;
}
