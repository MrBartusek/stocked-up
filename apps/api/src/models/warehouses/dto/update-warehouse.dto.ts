import { IUpdateWarehouseDto } from 'shared-types';
import { CreateWarehouseDto } from './create-warehouse.dto';

export class UpdateWarehouseDto extends CreateWarehouseDto implements IUpdateWarehouseDto {}
