import { BaseDto } from "../BaseDto";
import { IImageDto } from "../ImageDto";

export class BasicProductDto extends BaseDto {
    name: string;
    image: IImageDto;
    buyPrice: number;
    sellPrice: number;
    unit?: string;
}