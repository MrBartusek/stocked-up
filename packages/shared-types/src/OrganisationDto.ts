import { BaseDto } from "./BaseDto";
import { WarehouseDto } from "./BasicWarehouseDto";

export class OrganizationDto extends BaseDto {
    name: string;
    currency: string;
    totalValue: string
    warehouses: WarehouseDto[];
}