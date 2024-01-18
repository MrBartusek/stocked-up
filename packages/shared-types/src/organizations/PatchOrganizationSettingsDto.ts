import { IsIn, IsOptional } from "class-validator";

interface IPatchOrganizationSettingsDto {
    valueCalculationStrategy?: string;
}

export default IPatchOrganizationSettingsDto;