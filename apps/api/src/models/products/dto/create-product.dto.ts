import {
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	MaxLength,
	Min,
} from 'class-validator';
import { ICreateProductDto } from 'shared-types';
import { HasOrganizationAccess } from '../../../security/decorators/has-organization-access.decorator';

export class CreateProductDto implements ICreateProductDto {
	@IsMongoId()
	@HasOrganizationAccess()
	organization: string;

	@IsString()
	@Length(2, 32)
	name: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(2048)
	description?: string;

	@IsNumber()
	@Min(0)
	buyPrice: number;

	@IsNumber()
	@Min(0)
	sellPrice: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(32)
	unit?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(64)
	sku?: string;
}
