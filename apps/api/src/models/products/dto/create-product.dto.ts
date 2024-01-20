import { IsMongoId, IsNumber, Length, MaxLength } from 'class-validator';
import { ICreateProductDto } from 'shared-types';

export class CreateProductDto implements ICreateProductDto {
	@IsMongoId()
	organization: string;

	@Length(2, 32)
	name: string;

	@MaxLength(2048)
	description?: string;

	@IsNumber()
	buyPrice?: number;

	@IsNumber()
	sellPrice?: number;

	@MaxLength(32)
	unit?: string;

	@MaxLength(64)
	sku?: string;
}
