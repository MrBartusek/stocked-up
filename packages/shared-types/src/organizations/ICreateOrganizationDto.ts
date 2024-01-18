import { ICreateWarehouseDto } from "src/warehouse/ICreateWarehouseDto"

export interface ICreateOrganizationDto {
    name: string
    warehouse: ICreateWarehouseDto
}
