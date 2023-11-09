import { BasicWarehouseDto } from "../warehouse/BasicWarehouseDto";
import { BaseDto } from "../BaseDto";

export class OrganizationDto extends BaseDto {
    name: string;
    currency: string;
    stats: {
        totalProducts: number,
        totalValue: number,
        totalPendingOrders: number,
    }
    warehouses: BasicWarehouseDto[];
}