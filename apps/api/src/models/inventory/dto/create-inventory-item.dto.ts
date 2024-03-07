import { IsMongoId, IsNumber, Min } from 'class-validator';
import { ICreateInventoryItemDto } from 'shared-types';
import { HasOrganizationAccess } from '../../../security/decorators/has-organization-access.decorator';
import { HasProductAccess } from '../../../security/decorators/has-product-access.decorator';
import { HasWarehouseAccess } from '../../../security/decorators/has-warehouse-access.decorator';

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
	@Min(0)
	quantity: number;
}
