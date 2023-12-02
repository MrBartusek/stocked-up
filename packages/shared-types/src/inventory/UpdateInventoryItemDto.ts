import { IsNumber, IsOptional, IsString, Length, isString } from "class-validator";

export class UpdateInventoryItemDto {
    @IsNumber()
    quantity: number;

    @Length(1, 32)
    @IsString()
    @IsOptional()
    location?: string;
}
