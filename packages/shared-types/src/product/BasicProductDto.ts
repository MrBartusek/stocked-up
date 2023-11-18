import { BaseDto } from "../BaseDto";

export class BasicProductDto extends BaseDto {
    name: string;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}