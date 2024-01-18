import { BaseDto } from "../BaseDto";
import { IImageDto } from "../ImageDto";

export class BasicInventoryItemDto extends BaseDto {
    productId: string;
    name: string;
    image: IImageDto;
    quantity: number;
    unit: string;
}