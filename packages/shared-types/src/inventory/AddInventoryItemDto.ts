import { IsNumber, IsOptional } from "class-validator";

export class AddInventoryItemDto {
    warehouseId: string;
    productId: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}