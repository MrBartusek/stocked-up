import { CreateWarehouseDto } from "./CreateWarehouseDto"

export class CreateWarehouseInOrgDto {
    organizationId: string;
    warehouse: CreateWarehouseDto;
}