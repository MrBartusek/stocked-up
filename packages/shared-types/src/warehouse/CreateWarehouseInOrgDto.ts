import { Type } from "class-transformer";
import { IsMongoId, ValidateNested } from "class-validator";
import { CreateWarehouseDto } from "./CreateWarehouseDto";

export class CreateWarehouseInOrgDto {
    @IsMongoId()
    organizationId: string;

    @ValidateNested()
    @Type(() => CreateWarehouseDto)
    warehouse: CreateWarehouseDto;
}