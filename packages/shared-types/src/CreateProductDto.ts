import { IsNumber, Length, MaxLength } from "class-validator";

export class CreateProductDto {
    organizationId: string;

    @Length(2, 32)
    name: string;

    @MaxLength(2048)
    description?: string;

    @IsNumber()
    buyPrice?: number;

    @IsNumber()
    sellPrice?: number;

    @MaxLength(32)
    unit?: string;
}