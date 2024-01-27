import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ICreateInventoryItemDto } from 'shared-types';
import { HasWarehouseAccess } from '../../../security/decorators/has-warehouse-access.decorator';
import { HasProductAccess } from '../../../security/decorators/has-product-access.decorator copy';
import { HasOrganizationAccess } from '../../../security/decorators/has-organization-access.decorator';

export class CreateInventoryItemDto implements ICreateInventoryItemDto {
	@IsMongoId()
	@HasOrganizationAccess()
	organizationId: string;

	@IsMongoId()
	@HasWarehouseAccess()
	warehouseId: string;

	@IsMongoId()
	@HasProductAccess()
	productId: string;

	@IsNumber()
	@IsOptional()
	quantity?: number;
}
