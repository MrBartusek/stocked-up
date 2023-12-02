import { IsNumber, IsOptional, IsString, Length, isString } from "class-validator";

export class UpdateInventoryItemDto {
    @IsNumber()
    quantity: number;

    @IsString()
    @Length(1, 32)
    @IsOptional()
    location?: string;
}
