import { BaseDto } from "./BaseDto";

export interface BasicWarehouseDto extends BaseDto {
    name: string;
    address: string;
    totalValue: number;
}
