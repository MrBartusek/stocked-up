import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ICreateInventoryItemDto } from 'shared-types';

export class CreateInventoryItemDto implements ICreateInventoryItemDto {
	@IsMongoId()
	warehouseId: string;

	@IsMongoId()
	productId: string;

	@IsNumber()
	@IsOptional()
	quantity?: number;
}
