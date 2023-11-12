import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';
import * as mongoose from 'mongoose';

const DEFAULT_PROJECTIONS = {
	__v: 0,
};

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly entityModel: Model<T>) {}

	async findOne(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		return this.entityModel
			.findOne(entityFilterQuery, { ...DEFAULT_PROJECTIONS, ...projection })
			.exec();
	}

	async find(
		entityFilterQuery?: FilterQuery<T>,
		projection?: Record<string, unknown>,
	): Promise<T[] | null> {
		return this.entityModel
			.find(entityFilterQuery, { ...DEFAULT_PROJECTIONS, ...projection })
			.exec();
	}

	async findById(
		id: mongoose.Types.ObjectId | string,
		projection?: Record<string, unknown>,
	): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}

		const objectId = new mongoose.Types.ObjectId(id);
		return this.entityModel.findById(objectId, { ...DEFAULT_PROJECTIONS, ...projection }).exec();
	}

	async create(createEntityData: Partial<T>): Promise<T> {
		const entity = new this.entityModel(createEntityData);
		return entity.save() as Promise<T>;
	}

	async countDocuments(entityFilterQuery: FilterQuery<T>): Promise<number> {
		const count = await this.entityModel.countDocuments(entityFilterQuery).exec();
		return count;
	}

	async exist(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const count = await this.countDocuments(entityFilterQuery);
		return count > 0;
	}

	async findOneAndUpdate(
		entityFilterQuery: FilterQuery<T>,
		updateEntityData: UpdateQuery<T>,
	): Promise<T | null> {
		return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true });
	}

	async findOneByIdAndUpdate(
		id: mongoose.Types.ObjectId | string,
		updateEntityData: UpdateQuery<T>,
	): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}

		const objectId = new mongoose.Types.ObjectId(id);
		return this.findOneAndUpdate({ _id: objectId }, updateEntityData);
	}

	async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
		const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
		return deleteResult.deletedCount >= 1;
	}

	async deleteOneById(id: mongoose.Types.ObjectId | string): Promise<T | null> {
		if (!mongoose.isValidObjectId(id)) {
			return null;
		}
		const objectId = new mongoose.Types.ObjectId(id);
		return this.entityModel.findOneAndDelete({ _id: objectId });
	}

	async aggregate(pipeline: mongoose.PipelineStage[]): Promise<any[]> {
		return this.entityModel.aggregate(pipeline).exec();
	}
}
