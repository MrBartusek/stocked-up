import { CreateWarehouseDto } from "src/warehouse/CreateWarehouseDto"

export interface ICreateOrganizationDto {
    name: string
    warehouse: CreateWarehouseDto
}
