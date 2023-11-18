import { BaseDto } from "../BaseDto";

export class BasicInventoryItemDto extends BaseDto {
    name: string;
    quantity: number;
    unit: string;
}