import { IsMongoId, IsNumber, Length, MaxLength } from 'class-validator';
import { ICreateProductDto } from 'shared-types';
import { HasOrganizationAccess } from '../../../security/decorators/has-organization-access.decorator';

export class CreateProductDto implements ICreateProductDto {
	@IsMongoId()
	@HasOrganizationAccess()
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
