import { Type } from 'class-transformer';
import { IsMongoId, ValidateNested } from 'class-validator';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { ICreateWarehouseInOrgDto } from 'shared-types';
import { HasOrganizationAccess } from '../../../security/decorators/has-organization-access.decorator';

export class CreateWarehouseInOrgDto implements ICreateWarehouseInOrgDto {
	@IsMongoId()
	@HasOrganizationAccess()
	organizationId: string;

	@ValidateNested()
	@Type(() => CreateWarehouseDto)
	warehouse: CreateWarehouseDto;
}
