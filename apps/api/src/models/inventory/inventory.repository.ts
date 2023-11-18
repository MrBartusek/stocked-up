import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { InventoryItem, InventoryItemDocument } from './schemas/inventory-item.schema';

@Injectable()
export class InventoryRepository extends EntityRepository<InventoryItemDocument> {
	constructor(@InjectModel(InventoryItem.name) userModel: Model<InventoryItemDocument>) {
		super(userModel);
	}
}
