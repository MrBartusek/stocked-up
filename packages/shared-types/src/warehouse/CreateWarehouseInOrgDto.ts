import { MaxLength, ValidateNested } from "class-validator";
import { CreateWarehouseDto } from "./CreateWarehouseDto"
import { Type } from "class-transformer";

export class CreateWarehouseInOrgDto {
    organizationId: string;

    @ValidateNested()
    @Type(() => CreateWarehouseDto)
    warehouse: CreateWarehouseDto;
}