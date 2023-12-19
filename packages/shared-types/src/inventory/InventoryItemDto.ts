import { ProductDto } from "../product/ProductDto";

export class InventoryItemDto extends ProductDto {
    productId: string;
    quantity: number;
    location?: string;
}