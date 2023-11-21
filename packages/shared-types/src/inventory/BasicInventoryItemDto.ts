import { BaseDto } from "../BaseDto";

export class BasicInventoryItemDto extends BaseDto {
    productId: string;
    name: string;
    quantity: number;
    unit: string;
}