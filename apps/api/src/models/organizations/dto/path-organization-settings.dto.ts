import { IsEnum, IsOptional } from 'class-validator';
import { IPatchOrganizationSettingsDto } from 'shared-types';
import { OrgValueCalculationStrategy } from '../schemas/org-settings';
import { Currency } from 'country-code-enum';

export class PatchOrganizationSettingsDto implements IPatchOrganizationSettingsDto {
	@IsOptional()
	@IsEnum(OrgValueCalculationStrategy)
	valueCalculationStrategy?: string;

	@IsOptional()
	@IsEnum(Currency)
	currency?: string;
}
