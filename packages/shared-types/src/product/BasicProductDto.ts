import { BaseDto } from "../BaseDto";

export class BasicProductDto extends BaseDto {
    name: string;
    image: string;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}