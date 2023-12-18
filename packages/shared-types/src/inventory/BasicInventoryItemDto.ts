import { BaseDto } from "../BaseDto";

export class BasicInventoryItemDto extends BaseDto {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    unit: string;
}