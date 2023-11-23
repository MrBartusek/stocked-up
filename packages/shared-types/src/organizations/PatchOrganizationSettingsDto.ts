import { IsIn, IsOptional } from "class-validator";

export class PatchOrganizationSettingsDto {
    @IsOptional()
    @IsIn(['buyPrice', 'sellPrice'])
    valueCalculationStrategy?: string;
}