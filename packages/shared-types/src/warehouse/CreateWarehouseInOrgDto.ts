import { IsMongoId, MaxLength, ValidateNested } from "class-validator";
import { CreateWarehouseDto } from "./CreateWarehouseDto"
import { Type } from "class-transformer";

export class CreateWarehouseInOrgDto {
    @IsMongoId()
    organizationId: string;

    @ValidateNested()
    @Type(() => CreateWarehouseDto)
    warehouse: CreateWarehouseDto;
}