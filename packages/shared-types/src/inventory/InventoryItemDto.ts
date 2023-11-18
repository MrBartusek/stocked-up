import { BaseDto } from "../BaseDto";
import { ProductDto } from "../product/ProductDto";

export class InventoryItemDto extends ProductDto {
    quantity: number;
}