import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';

@Injectable()
export class WarehouseRepository extends EntityRepository<WarehouseDocument> {
	constructor(@InjectModel(Warehouse.name) userModel: Model<WarehouseDocument>) {
		super(userModel);
	}
}
