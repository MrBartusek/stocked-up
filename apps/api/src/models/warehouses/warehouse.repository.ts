import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { EntityRepository } from '../../database/entity.repository';

@Injectable()
export class WarehouseRepository extends EntityRepository<WarehouseDocument> {
	constructor(@InjectModel(Warehouse.name) userModel: Model<WarehouseDocument>) {
		super(userModel);
	}
}
