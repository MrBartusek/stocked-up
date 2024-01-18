import { CreateWarehouseDto } from './create-warehouse.dto';
import { IUpdateWarehouseDto } from 'shared-types';

export class UpdateWarehouseDto extends CreateWarehouseDto implements IUpdateWarehouseDto {}
