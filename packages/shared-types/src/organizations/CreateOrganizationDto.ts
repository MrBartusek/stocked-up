import { Length } from "class-validator"
import { CreateWarehouseDto } from "src/warehouse/CreateWarehouseDto"

export class CreateOrganizationDto {
    @Length(2, 32)
    name: string

    warehouse: CreateWarehouseDto
}