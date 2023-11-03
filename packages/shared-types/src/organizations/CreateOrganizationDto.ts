import { CreateWarehouseDto } from "src/warehouse/CreateWarehouseDto"

export class CreateOrganizationDto {
    name: string
    warehouse: CreateWarehouseDto
}