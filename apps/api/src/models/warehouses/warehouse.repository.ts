import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';

@Injectable()
export class WarehouseRepository extends EntityRepository<WarehouseDocument> {
	constructor(@InjectModel(Warehouse.name) warehouseModel: Model<WarehouseDocument>) {
		super(warehouseModel);
	}
}
