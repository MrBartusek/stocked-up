import { IsMongoId, IsNumber, IsOptional } from "class-validator";

export class CreateInventoryItemDto {
    @IsMongoId()
    warehouseId: string;

    @IsMongoId()
    productId: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}