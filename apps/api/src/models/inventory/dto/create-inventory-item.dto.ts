import { IsMongoId, IsNumber, IsOptional, Validate } from 'class-validator';
import { ICreateInventoryItemDto } from 'shared-types';
import { HasProductAccessRule } from '../../../rules/has-product-access.rule';

export class CreateInventoryItemDto implements ICreateInventoryItemDto {
	@IsMongoId()
	warehouseId: string;

	@IsMongoId()
	@Validate(HasProductAccessRule)
	productId: string;

	@IsNumber()
	@IsOptional()
	quantity?: number;
}
