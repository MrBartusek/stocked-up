import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { IUpdateInventoryItemDto } from 'shared-types';

export class UpdateInventoryItemDto implements IUpdateInventoryItemDto {
	@IsNumber()
	@Min(0)
	quantity: number;

	@IsOptional()
	@IsString()
	@Length(1, 64)
	location?: string;
}
