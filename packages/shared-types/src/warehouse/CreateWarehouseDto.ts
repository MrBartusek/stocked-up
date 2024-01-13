import { IsOptional, Length } from "class-validator"

export class CreateWarehouseDto {
    @Length(2, 32)
    name: string

    @IsOptional()
    @Length(2, 32)
    address?: string
}