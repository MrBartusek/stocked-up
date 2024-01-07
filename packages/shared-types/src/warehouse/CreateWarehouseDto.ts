import { IsOptional, Length } from "class-validator"

export class CreateWarehouseDto {
    @Length(2, 32)
    name: string

    @Length(2, 32)
    @IsOptional()
    address?: string
}