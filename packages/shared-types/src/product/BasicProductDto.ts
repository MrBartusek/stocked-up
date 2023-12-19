import { BaseDto } from "../BaseDto";
import { ImageDto } from "../ImageDto";

export class BasicProductDto extends BaseDto {
    name: string;
    image: ImageDto;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}