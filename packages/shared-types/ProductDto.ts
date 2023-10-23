import { BaseDto } from "./BaseDto";

export class ProductDto extends BaseDto {
    _id: any;
    name: string;
    description?: string;
    imageUrl?: string;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}