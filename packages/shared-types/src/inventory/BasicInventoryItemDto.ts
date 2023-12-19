import { BaseDto } from "../BaseDto";
import { ImageDto } from "../ImageDto";

export class BasicInventoryItemDto extends BaseDto {
    productId: string;
    name: string;
    image: ImageDto;
    quantity: number;
    unit: string;
}