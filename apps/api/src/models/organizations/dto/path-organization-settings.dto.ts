import { IsIn, IsOptional } from 'class-validator';
import { IPatchOrganizationSettingsDto } from 'shared-types';

export class PatchOrganizationSettingsDto implements IPatchOrganizationSettingsDto {
	@IsOptional()
	@IsIn(['buyPrice', 'sellPrice'])
	valueCalculationStrategy?: string;
}
