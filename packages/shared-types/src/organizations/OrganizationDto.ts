import { BaseDto } from "../BaseDto";
import { BasicWarehouseDto } from "../warehouse/BasicWarehouseDto";

export class OrganizationDto extends BaseDto {
    name: string;
    currency: string;
    stats: {
        totalProducts: number,
        totalValue: number,
        totalQuantityInHand: number,
    }
    settings: {
        valueCalculationStrategy: 'buyPrice' | 'sellPrice'
    }
    warehouses: BasicWarehouseDto[];
}