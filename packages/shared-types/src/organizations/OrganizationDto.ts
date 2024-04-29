import { BaseDto } from "../BaseDto";
import { BasicWarehouseDto } from "../warehouse/BasicWarehouseDto";

export class OrganizationDto extends BaseDto {
    name: string;
    stats: {
        totalProducts: number,
        totalValue: number,
        totalQuantity: number,
    }
    settings: {
        valueCalculationStrategy: 'buyPrice' | 'sellPrice',
        currency: string,
    }
    warehouses: BasicWarehouseDto[];
}