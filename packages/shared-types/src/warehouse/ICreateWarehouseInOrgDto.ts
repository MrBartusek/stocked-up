import { ICreateWarehouseDto } from "./ICreateWarehouseDto";

export class ICreateWarehouseInOrgDto {
    organizationId: string;
    warehouse: ICreateWarehouseDto;
}