import { IsBoolean, Length } from "class-validator"

export class CreateWarehouseDto {
    @Length(2, 32)
    name: string

    @Length(2, 32)
    address: string
}