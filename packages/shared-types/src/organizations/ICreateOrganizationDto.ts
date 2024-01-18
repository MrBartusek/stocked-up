import { CreateWarehouseDto } from "src/warehouse/CreateWarehouseDto"

 interface ICreateOrganizationDto {
    name: string
    warehouse: CreateWarehouseDto
}

export default ICreateOrganizationDto