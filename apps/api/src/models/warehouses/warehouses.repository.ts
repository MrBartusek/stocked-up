import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WarehousesRepository extends EntityRepository<WarehouseDocument> {
	constructor(@InjectModel(Warehouse.name) productModel: Model<WarehouseDocument>) {
		super(productModel);
	}
}
